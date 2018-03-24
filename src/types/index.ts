export interface IDrawer {
    open: boolean;
}

export interface INetworkStatus {
    online: boolean;
    message: string;
}

export interface IStoreState {
    drawer: IDrawer;
    network_status: INetworkStatus;
}

export declare const Notification: {
    prototype: Notification;
    readonly permission: NotificationPermission;
    new(title: string, options?: NotificationOptions): Notification;
    requestPermission(callback?: NotificationPermissionCallback): Promise<NotificationPermission>;
};