import * as React from 'react';
import './App.css';
import Header from '../header';
import NetworkStatus from '../networkStatus';
import SwPushNotificationCtrl from '../../services/swPushNotificationCtrl';

const logo = require('../../assets/images/logo.svg');

export interface IAppUIStateProps {
    firebaseCtl?: firebase.app.App;
    pushNotificationCtrl?: SwPushNotificationCtrl;
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

    if (this.props.pushNotificationCtrl) {
      this.props.pushNotificationCtrl.subscribeUser();
    }
  }

  public render(): React.ReactElement<HTMLElement> {
    const  HeaderContainer = Header.Container;
    const NetworkStatusContainer = NetworkStatus.Container;
    return (
      <div className="App">
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
