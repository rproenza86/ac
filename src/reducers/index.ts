import { combineReducers, Reducer } from 'redux';
import drawerReducer from './drawer';
import networkStatusReducer from './network_status';
import { IStoreState } from '../types';

const reducers = {
    drawer: drawerReducer,
    network_status: networkStatusReducer
};

const rootReducer: Reducer<IStoreState> = combineReducers(reducers);

export default rootReducer;
export * from './drawer';
