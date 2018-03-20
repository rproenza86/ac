import { combineReducers, Reducer } from 'redux';
import drawerReducer from './drawer';
import { IStoreState } from '../types';

const reducers = {
    drawer: drawerReducer
};

const rootReducer: Reducer<IStoreState> = combineReducers(reducers);

export default rootReducer;
export * from './drawer';
