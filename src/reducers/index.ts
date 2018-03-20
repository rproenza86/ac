import { combineReducers } from 'redux';
import drawerReducer from './drawer';

const reducers = {
    drawer: drawerReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
export * from './drawer';
