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