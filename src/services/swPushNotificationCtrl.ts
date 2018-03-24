import { Notification } from '../types';
import { FirebaseError } from 'firebase';
require('firebase/firestore');

export type SWRegistration = ServiceWorkerRegistration | undefined;

export interface ISubscriptionJson {
    url: string;
    keys: {
        auth: string;
        p256dh: string;
    };
}

// tslint:disable:no-console
export default class SwPushNotificationCtrl {
    private swRegistration: SWRegistration | undefined;
    private userPushSubscription: PushSubscription | undefined;
    private appServerPublicKey: string = '';
    private firebase: firebase.app.App;
    private userStorage: Storage;
    
    public constructor(appServerPublicKey: string, firebase: firebase.app.App) {
        if (appServerPublicKey) {
            this.appServerPublicKey = appServerPublicKey;
        } else {
            throw new Error('Push Notifications systems requires application server Public Key.');
        }
        if (!firebase) {
            throw new Error('SwPushNotificationCtrl class requires firebase\'s reference.');
        }

        navigator.serviceWorker.ready
        .then((registration: ServiceWorkerRegistration) => {
            this.swRegistration = registration;
            return registration.pushManager.getSubscription()
            .then((subscription: PushSubscription) => {
                this.userPushSubscription = subscription;
                return;
            });
        });

        this.firebase = firebase;
        this.userStorage = window.localStorage;
    }

    public subscribeUser(): void {
        if (!this.swRegistration) {
            return this.setupSwRegistration();
        }
        if (this.userPushSubscription) {
            this.addUpdateSubscriptionOnServer(this.userPushSubscription);
        } else {
            this.askUserRegisterPushNotifications();
        }
    }

    public unsubscribeUser(): boolean | void {
        if (!this.swRegistration) {
            return false;
        }
        if (!this.userPushSubscription) {
            return true;
        }

        try {
            if (this.userPushSubscription) {
                if (this.firebase.auth().currentUser) {
                    this.userPushSubscription.unsubscribe();
                } else {
                    this.firebase.auth().signInAnonymously()
                    .then(() => this.unsubscribeUser())
                    .catch(function(error: FirebaseError) {
                        console.error('Error on signInAnonymously', error);
                    });
                }

                const subscriptionId = this.userStorage.getItem('subscriptionId');
                this.userStorage.removeItem('subscriptionId');

                this.deleteSubscriptionOnDB(subscriptionId, this.userPushSubscription.toJSON());
                this.userPushSubscription = undefined;

                console.log('User is unsubscribed.');
          } else {
              return true;
          }
        } catch (error) {
            console.log('Error unsubscribing', error);
        }
    }

    public isPushNotificationDenied(): boolean {
        if (!Notification) {
            return true;
        }

        const permission: NotificationPermission = Notification.permission;
        if (permission === 'denied') {
          return true;
        } else {
            return false;
        }
    }

    public isPushNotificationGranted(): boolean {
        if (!Notification) {
            return false;
        }

        const permission: NotificationPermission = Notification.permission;
        if (permission === 'granted') {
          return true;
        } else {
            return false;
        }
    }

    private setupSwRegistration(): void {
        navigator.serviceWorker.getRegistration()
        .then(registration => {
            if (registration) {
                this.swRegistration = registration;
                registration.pushManager.getSubscription()
                .then((subscription: PushSubscription) => {
                    this.userPushSubscription = subscription;
                    this.subscribeUser();
                });
            }
        });
    }

    private askUserRegisterPushNotifications() {
        const applicationServerKey = this.urlB64ToUint8Array(this.appServerPublicKey);

        if (this.swRegistration) {
            this.swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            })
            .then((subscription: PushSubscription) => {
                console.log('User is subscribed.', subscription);
                this.addUpdateSubscriptionOnServer(subscription);
                this.userPushSubscription = subscription;
            })
            .catch(function(err: Error) {
                if (Notification.permission === 'denied') {
                    console.warn('Permission for notifications was denied');
                } else {
                    console.error('Failed to subscribe the user: ', err);
                }
                // TODO: update our app with some logic to send messages to the user in some other way.
            });
        }
    }

    private urlB64ToUint8Array(base64String: string): Uint8Array {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
    
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0, rawDataLength = rawData.length; i < rawDataLength; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    }

    private addUpdateSubscriptionOnServer(subscription: PushSubscription | null): boolean {
        if (subscription) {
            if (this.firebase.auth().currentUser) {
                let subscriptionId = this.userStorage.getItem('subscriptionId');
                const subscriptionJson: ISubscriptionJson = subscription.toJSON();
                if (subscriptionId) {
                    this.updateSubscriptionOnDB(subscriptionId, subscriptionJson);
                    return true;
                } else {
                    this.addSubscriptionOnDB(subscriptionJson);
                }
                return true;
            } else {
                this.firebase.auth().signInAnonymously()
                .then(() => this.addUpdateSubscriptionOnServer(subscription))
                .catch(function(error: FirebaseError) {
                    console.error('Error on signInAnonymously', error);
                });
            }
        }
        return false;
    }

    private updateSubscriptionOnDB (subscriptionId: string, subscriptionJson: ISubscriptionJson ): void {
        const db = this.firebase.firestore();
        const savedDocRef = db.collection('subscriptions').doc(subscriptionId);

        db.runTransaction((transaction: firebase.firestore.Transaction) => {
            return transaction.get(savedDocRef).then(function(sfDoc: firebase.firestore.DocumentSnapshot) {
                if (!sfDoc.exists) {
                    throw 'Document does not exist!';
                }
                if (sfDoc.data()) {
                    transaction.update(savedDocRef, {...subscriptionJson});
                }
            });
        }).then(() => {
            console.log('Subscription updated to: ', subscriptionJson);
        }).catch(function(err: Error) {
            // TODO: fallback solution with 2 more intents
            console.error(err);
        });
    }

    private addSubscriptionOnDB (subscriptionJson: ISubscriptionJson ): void {
        const db = this.firebase.firestore();
        db.collection('subscriptions').add({
            ...subscriptionJson
        })
        .then((newDocRef: firebase.firestore.DocumentReference) => {
            const subscriptionId: string = newDocRef.id;
            console.log('Document written with ID: ', subscriptionId);
            this.userStorage.setItem('subscriptionId', subscriptionId);
        })
        .catch((error: Error) => {
            console.error('Error adding document: ', error);
        });
    }
    /**
     *  unstable
     * @param subscriptionId 
     * @param subscriptionJson 
     */
    private deleteSubscriptionOnDB (subscriptionId: string | null, subscriptionJson: ISubscriptionJson) {
        const db = this.firebase.firestore();
        let removeSubscription;

        if (subscriptionId) {
            const subscription = db.collection('subscriptions').doc(subscriptionId);

            removeSubscription = subscription.update({
                subscription: firebase.firestore.FieldValue.delete()
            });
        }
        // TODO: Check if the next scenario could be valid
        if (subscriptionJson.url) {
            const subscriptions = db.collection('subscriptions');

            subscriptions.where('url', '==', subscriptionJson.url)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete().then(() => {
                        console.log('Document successfully using rmUsingSubscriptionUrl deleted!');
                    }).catch(function(error: Error) {
                        console.error('Error removing document using rmUsingSubscriptionUrl: ', error);
                    });
                });
            })
            .catch(function(error: Error) {
                console.log('Error getting documents using rmUsingSubscriptionUrl: ', error);
            });
        }

        return { removeSubscription };
    }
}
// tslint:enable:no-console