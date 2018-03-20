import { DrawerActions } from '../actions';
import { IDrawer } from '../types/index';
import { OPEN_DRAWER, CLOSE_DRAWER } from '../constants/index';

export default function drawerReducer(state: IDrawer = { open: false }, action: DrawerActions): IDrawer {
    const newState: IDrawer = { ...state };
    switch (action.type) {
        case OPEN_DRAWER:
            return { ...newState, open: true };
        case CLOSE_DRAWER:
            return { ...newState, open: false };
        default:
            return newState;
    }
}
