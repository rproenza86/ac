import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as webPush from 'web-push';

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export interface ISubscription {
    id?: string;
    endpoint: string;
    expirationTime: string | null;
    keys: {
        auth: string;
        p256dh: string;
    }
}

async function sendPushNotification(subscription: ISubscription, queryParams) {
    const { id, ...pushSubscription } = subscription;
    webPush.setGCMAPIKey(functions.config().gcm.apikey);
    webPush.setVapidDetails(
        'mailto:example@yourdomain.org',
        functions.config().vapid.publickey,
        functions.config().vapid.privatekey
    );

    const payload = {
        message: queryParams.message || 'Atomic Coders has a awesome backEnd service.',
        pushSubscription,
        subscriptionId: id
    }

    return await webPush.sendNotification(pushSubscription, JSON.stringify(payload))
        .then((resp) => {
            console.log(`Message response of id : ${id} => ${JSON.stringify(resp)}`);
            return `Hello from Firebase! ${JSON.stringify(resp)}`;
        })
        .catch((err) => {
            console.log(err);
            return `Hello from Firebase! ${JSON.stringify(err)}`;
        });
};

export const notifyUser = functions.https.onRequest((request, response) => {
    const db = admin.firestore();
    const queryParams = request.query;
    let subscription: ISubscription;

    db.collection('subscriptions').get()
    .then((snapshot) => {
        const subscriptionsQueue: ISubscription[] = [];
        const notificationResponses = [];

        snapshot.forEach((doc) => {
            const data = doc.data();

            subscription = {
                id: doc.id,
                endpoint: data.endpoint,
                expirationTime: data.expirationTime,
                keys: {
                    auth: data.keys.auth,
                    p256dh: data.keys.p256dh
                }
            };

            console.log(subscription.id, '=>', subscription);

            subscriptionsQueue.push(subscription);
            notificationResponses.push(sendPushNotification(subscription, queryParams));
        });

        const result = JSON.stringify({
            subscriptionsQueue: subscriptionsQueue,
            notificationResponses: notificationResponses
        });

        response.send(`Sending notifications to : ${result}`);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        response.send(`Error getting documents : ${JSON.stringify(err)}`);
    });
});
