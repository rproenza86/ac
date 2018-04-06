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

async function deleteSubscriptionOnDB (subscription: ISubscription) {
    const { id, ...pushSubscription } = subscription;
    const db = admin.firestore();

    if (id) {
        const dbSubscription: FirebaseFirestore.WriteResult = await db.collection('subscriptions').doc(id).delete();
        return dbSubscription;
    }

    return '';
};

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
            console.info(`Push notification send to id : ${id} => ${JSON.stringify(resp)}`);
            return `Push notification send! ${JSON.stringify(resp)}`;
        })
        .catch((err) => {
            const cleanDB = async function() {
                return await deleteSubscriptionOnDB(subscription);
            };
            const errorMessage = {
                error: err,
                deleteRegistration: cleanDB()
            }
            console.error('Ups!!! Error sending notification!', errorMessage);
            return `Ups!!! Error sending notification! ${JSON.stringify(errorMessage)}`;
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
