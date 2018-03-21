import { IStoreState, INetworkStatus } from '../types';

export const getNetworkStatusState = (state: IStoreState): INetworkStatus => {
    return state.network_status || {};
};

export const getNetworkStatus = (state: IStoreState): boolean => {
    const NetworkStatus = getNetworkStatusState(state);
    return NetworkStatus.online || false;
};

export const getNetworkStatusMessage = (state: IStoreState): string => {
    const NetworkStatus = getNetworkStatusState(state);
    return NetworkStatus.message || '';
};