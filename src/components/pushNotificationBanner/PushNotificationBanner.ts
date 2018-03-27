import { connect, Dispatch } from 'react-redux';
import { IStoreState } from '../../types';
import { notificationEnabled, PushNotificationsActions, notificationSkipped, notificationDenied } from '../../actions';
import PushNotificationBannerUI, 
      {
        IPushNotificationBannerUIStateProps,
        IPushNotificationBannerUIDispatchProps
      } from './PushNotificationBannerUI';

export interface IPushNotificationBannerProps {
}

const mapStateToProps = (state: IStoreState,
                         ownProps: IPushNotificationBannerProps
                        ): IPushNotificationBannerUIStateProps => {
    const result = {
    };
    return result;
};

const mapDispatchToProps = (dispatch: Dispatch<PushNotificationsActions>):
                           IPushNotificationBannerUIDispatchProps => {
    return {
        enablePushNotification: () => dispatch(notificationEnabled(true)),
        skipPushNotification: () => dispatch(notificationSkipped()),
        disablePushNotification: () => dispatch(notificationDenied())
    };
};

const PushNotificationBanner = connect(
    mapStateToProps,
    mapDispatchToProps
)(PushNotificationBannerUI);

export default PushNotificationBanner;
