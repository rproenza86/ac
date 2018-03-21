import { APP_ONLINE, APP_OFFLINE } from '../constants';

export interface IAppOnline {
    type: APP_ONLINE;
}

export interface IAppOffline {
    type: APP_OFFLINE;
}

export type NetworkStatusActions = IAppOnline | IAppOffline;

export function appOnline(): IAppOnline {
    return {
        type: APP_ONLINE
    };
}

export function appOffline(): IAppOffline {
    return {
        type: APP_OFFLINE
    };
}