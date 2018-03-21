import { NetworkStatusActions } from '../actions';
import { INetworkStatus } from '../types/index';
import { APP_ONLINE, APP_OFFLINE } from '../constants/index';

const initialState = { online: true, message: '' };

function networkStatusReducer(state: INetworkStatus = initialState, action: NetworkStatusActions): INetworkStatus {
    const newState: INetworkStatus = { ...state };
    switch (action.type) {
        case APP_ONLINE:
            return { ...newState, online: true, message: 'The app is working online.' };
        case APP_OFFLINE:
            return { ...newState, online: false, message: 'The app is working offline.' };
        default:
            return newState;
    }
}

export default networkStatusReducer;