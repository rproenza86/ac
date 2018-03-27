import { PushNotificationsActions, INotificationEnabled } from '../actions';
import { IPushNotification } from '../types';
import { 
    NOTIFICATION_DENIED,
    NOTIFICATION_ENABLED,
    NOTIFICATION_SKIPPED,
    NOTIFICATION_SUPPORTED
} from '../constants';

const initialState = {
    enabled: false,
    supported: false,
    denied: false,
    skipped: false,
};

function pushNotificationsReducer(state: IPushNotification = initialState, action: PushNotificationsActions): IPushNotification {
    const newState: IPushNotification = { ...state };
    switch (action.type) {
        case NOTIFICATION_DENIED:
            return { ...newState, denied: true };
        case NOTIFICATION_ENABLED:
            const caseAction: INotificationEnabled = action;
            return { ...newState, enabled: caseAction.payload.enabled };
        case NOTIFICATION_SKIPPED:
            return { ...newState, skipped: true };
        case NOTIFICATION_SUPPORTED:
            return { ...newState, supported: true };
        default:
            return newState;
    }
}

export default pushNotificationsReducer;