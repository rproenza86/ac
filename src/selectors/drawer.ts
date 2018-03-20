import { IStoreState, IDrawer } from '../types';

export const getDrawerState = (state: IStoreState): IDrawer => {
    return state.drawer || {};
};

export const getDrawerOpenStatus = (state: IStoreState): boolean => {
    const drawer = getDrawerState(state);
    return drawer.open || false;
};