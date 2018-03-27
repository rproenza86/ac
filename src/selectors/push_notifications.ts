import { IStoreState, IPushNotification } from '../types';

export const getPushNotificationState = (state: IStoreState): IPushNotification => {
    return state.push_notification || {};
};

export const getPushNotificationSupported = (state: IStoreState): boolean => {
    const PushNotification = getPushNotificationState(state);
    return PushNotification.supported || false;
};

export const getPushNotificationDenied = (state: IStoreState): boolean => {
    const PushNotification = getPushNotificationState(state);
    return PushNotification.denied || true;
};

export const getPushNotificationEnabled = (state: IStoreState): boolean => {
    const PushNotification = getPushNotificationState(state);
    return PushNotification.enabled || true;
};

export const getPushNotificationSkipped = (state: IStoreState): boolean => {
    const PushNotification = getPushNotificationState(state);
    return PushNotification.skipped || true;
};