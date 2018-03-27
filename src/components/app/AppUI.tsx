import * as React from 'react';
import './App.css';
import Header from '../header';
import NetworkStatus from '../networkStatus';
import PushNotificationBannerUI from '../pushNotificationBanner';

const logo = require('../../assets/images/logo.svg');

export interface IAppUIStateProps {
}

export interface IAppUIDispatchProps {
    notifyAppOnline: () => void;
    notifyAppOffline: () => void;
}

interface IAppUIProps extends IAppUIStateProps, IAppUIDispatchProps {
}

class AppUI extends React.Component<IAppUIProps, {}> {
  public constructor(props: IAppUIDispatchProps) {
    super(props);

    window.addEventListener('online', (event) => {
        this.props.notifyAppOnline();
      }
    );

    window.addEventListener('offline', (event) => this.props.notifyAppOffline());
  }

  public render(): React.ReactElement<HTMLElement> {
    const  HeaderContainer = Header.Container;
    const NetworkStatusContainer = NetworkStatus.Container;
    const PushNotificationBannerUIContainer = PushNotificationBannerUI.Container;
    return (
      <div className="App">
        <PushNotificationBannerUIContainer/>
        <HeaderContainer/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <NetworkStatusContainer/>
      </div>
    );
  }
}

export default AppUI;
