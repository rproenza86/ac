import { combineReducers, Reducer } from 'redux';
import drawerReducer from './drawer';
import networkStatusReducer from './network_status';
import pushNotificationsReducer from './push_notifications';
import { IStoreState } from '../types';

const reducers = {
    drawer: drawerReducer,
    network_status: networkStatusReducer,
    push_notifications: pushNotificationsReducer
};

const rootReducer: Reducer<IStoreState> = combineReducers(reducers);

export default rootReducer;
export * from './drawer';
