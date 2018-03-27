import { 
    NOTIFICATION_DENIED,
    NOTIFICATION_ENABLED,
    NOTIFICATION_SKIPPED,
    NOTIFICATION_SUPPORTED
} from '../constants';

export interface INotificationDenied {
    type: NOTIFICATION_DENIED;
}
export function notificationDenied(): INotificationDenied {
    return {
        type: NOTIFICATION_DENIED
    };
}

export interface INotificationEnabled {
    type: NOTIFICATION_ENABLED;
    payload: {
        enabled: boolean;
    };
}
export function notificationEnabled(enabled: boolean): INotificationEnabled {
    return {
        type: NOTIFICATION_ENABLED,
        payload: {
            enabled
        }
    };
}

export interface INotificationSkipped {
    type: NOTIFICATION_SKIPPED;
}
export function notificationSkipped(): INotificationSkipped {
    return {
        type: NOTIFICATION_SKIPPED
    };
}

export interface INotificationSupported {
    type: NOTIFICATION_SUPPORTED;
}
export function notificationSupported(): INotificationSupported {
    return {
        type: NOTIFICATION_SUPPORTED
    };
}

export type PushNotificationsActions = INotificationDenied | INotificationEnabled | INotificationSkipped | INotificationSupported;