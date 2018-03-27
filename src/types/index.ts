export interface IDrawer {
    open: boolean;
}

export interface INetworkStatus {
    online: boolean;
    message: string;
}

export interface IPushNotification {
    enabled: boolean;
    supported: boolean;
    denied: boolean;
    skipped: boolean;
}

export interface IStoreState {
    drawer: IDrawer;
    network_status: INetworkStatus;
    push_notification: IPushNotification;
}

export declare const Notification: {
    prototype: Notification;
    readonly permission: NotificationPermission;
    new(title: string, options?: NotificationOptions): Notification;
    requestPermission(callback?: NotificationPermissionCallback): Promise<NotificationPermission>;
};