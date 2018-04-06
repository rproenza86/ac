import * as React from 'react';
import './PushNotificationBannerUI.css';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { pushNotificationCtrl as pushNotificationCtrlInstance } from '../../index';
import { INotificationDenied, INotificationSkipped, INotificationEnabled } from '../../actions';

export interface IPushNotificationBannerUIStateProps {
}

export interface IPushNotificationBannerUIDispatchProps {
    enablePushNotification?: () => INotificationEnabled;
    skipPushNotification?: () => INotificationSkipped;
    disablePushNotification?: () => INotificationDenied;
}

export interface IPushNotificationBannerUIState {
    showMainBanner: boolean;
    showSecondaryBanner: boolean;
    message: string;
    open: boolean;
    intents: number;
}

interface IPushNotificationBannerUIProps extends IPushNotificationBannerUIStateProps,
                                                 IPushNotificationBannerUIDispatchProps {
}

const styles = {
    title: {
        cursor: 'pointer',
        fontSize: '16px',
        height: 'unset',
        color: 'white',
        padding: '5px',
        width: '100%'
    },
    paper: {
        height: '80%',
        width: '80%',
        textAlign: 'center',
        display: 'inline-block',
      }
  };

class PushNotificationBannerUI extends React.Component<IPushNotificationBannerUIProps, IPushNotificationBannerUIState> {
    public constructor(props: IPushNotificationBannerUIProps) {
        super(props);
        let showMainBanner: boolean = this.isMainBannerNeeded();
        this.state = {
            showMainBanner,
            showSecondaryBanner: false,
            message: 'Allow as send you notifications',
            open: true,
            intents: 2
        };
    }

    public render(): React.ReactElement<HTMLElement> {
        return this.generateHTMLElement();
    }

    private generateHTMLElement(): React.ReactElement<HTMLElement> {
        if (pushNotificationCtrlInstance) {
            return this.generateBanner();
        } else {
            return <span/>;
        }
    }

    private generateBanner(): React.ReactElement<HTMLElement> {
        if (!this.isMainBannerNeeded()) {
            return <span/>;
        }
        if (window.screen.width <= 1024 && window.screen.height <= 768) {
            return (
                <Snackbar
                        open={this.state.open}
                        message={this.state.message}
                        action="Enable"
                        autoHideDuration={8000}
                        onRequestClose={() => this.retryEnableNotifications()}
                        onActionClick={() => this.enableNotifications()}
                />
            );
        }
        if (this.state.showMainBanner) {
            return (
                <div className="push-notification-banner">
                    <AppBar
                        title={ 
                            <IconButton style={styles.title}>
                            Atomic Coders needs your permission to
                            <span className="push-notification-banner-permission" > enable notifications</span>
                            </IconButton>}
                        onTitleClick={() => this.enableNotifications()}
                        className="push-notification-banner-inner"
                        titleStyle={{
                            lineHeight: 'unset',
                            height: 'unset'
                        }}
                        iconStyleRight={{
                            lineHeight: 'unset',
                            height: 'unset',
                            marginTop: 'unset'
                        }}
                        iconElementRight={ <IconButton style={{ padding: '5px', height: 'unset', width: 'unset' }}>
                                                <NavigationClose />
                                            </IconButton>}
                        showMenuIconButton={false}
                        onRightIconButtonClick={() => this.showSecondaryBanner()}
                    />
                </div>
            );
        }
        if (this.state.showSecondaryBanner) {
            return (
                <div className="push-notification-banner">
                    <AppBar
                        title={ 
                            <IconButton style={styles.title}>
                            We strongly recommend enabling notifications if you’ll be using our services.
                            &#9702;
                            <span className="push-notification-banner-permission" onClick={() => this.enableNotifications()} >
                                Enable notifications
                            </span>.
                            &#9702;
                            <span className="push-notification-banner-permission" onClick={() => this.hideBanners()}>
                                Ask me next time
                            </span>.
                            &#9702;
                            <span className="push-notification-banner-permission" onClick={() => this.disablePushNotification()}>
                                Never ask again
                            </span>.
                            </IconButton>}
                        className="push-notification-banner-inner"
                        titleStyle={{
                            lineHeight: 'unset',
                            height: 'unset'
                        }}
                        iconStyleRight={{
                            lineHeight: 'unset',
                            height: 'unset',
                            marginTop: 'unset'
                        }}
                        iconElementRight={ <IconButton style={{ padding: '5px', height: 'unset', width: 'unset' }}>
                                                <NavigationClose />
                                            </IconButton>}
                        showMenuIconButton={false}
                        onRightIconButtonClick={() => this.hideBanners()}
                    />
                </div>
            );
        }
        return <span/>;
    }

    private isMainBannerNeeded(): boolean {
        if (pushNotificationCtrlInstance) {
            if (pushNotificationCtrlInstance.isPushNotificationDenied() || pushNotificationCtrlInstance.isPushNotificationGranted()) {
                return false;
            } 
        }
        if (!pushNotificationCtrlInstance || localStorage.getItem('subscriptionId') || localStorage.getItem('isNotificationPermissionDenied')) {
            return false;
        }
        return true;
    }

    private enableNotifications() {
        if (pushNotificationCtrlInstance) {
            pushNotificationCtrlInstance.subscribeUser();
            if (this.props.enablePushNotification) {
                this.props.enablePushNotification();
            }
        }
        this.hideComponent();
        this.setState({
            open: false,
        });
    }

    private retryEnableNotifications() {
        let intents = this.state.intents;

        if (intents) {
            setTimeout(() => {
                        this.setState({
                            open: true,
                        });
                    }, 500000);
        }
        this.setState({
            open: false,
            intents: intents ? --intents : 0
        });
    }

    private showSecondaryBanner(): void {
        this.setState({
            showMainBanner: false,
            showSecondaryBanner: true
        });
    }

    private hideBanners() {
        if (event) {
            if (this.props.skipPushNotification) {
                this.props.skipPushNotification();
            }
        }
        this.hideComponent();
    }

    private hideComponent() {
        this.setState({
            showMainBanner: false,
            showSecondaryBanner: false
        });
    }

    private disablePushNotification() {
        if (this.props.disablePushNotification) {
            this.props.disablePushNotification();
        }
        this.hideComponent();
        localStorage.setItem('isNotificationPermissionDenied', 'true');
    }
}

export default PushNotificationBannerUI;
