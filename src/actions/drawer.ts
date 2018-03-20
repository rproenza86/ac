import * as constants from '../constants';

export interface IOpenDrawer {
    type: constants.OPEN_DRAWER;
}

export interface ICloseDrawer {
    type: constants.CLOSE_DRAWER;
}

export type DrawerActions = IOpenDrawer | ICloseDrawer;

export function openDrawer(): IOpenDrawer {
    return {
        type: constants.OPEN_DRAWER
    };
}

export function closeDrawer(): ICloseDrawer {
    return {
        type: constants.CLOSE_DRAWER
    };
}