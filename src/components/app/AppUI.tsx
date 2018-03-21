import * as React from 'react';
import './App.css';
import Header from '../header';
import Snackbar from '../snackbar/SnackbarUI';

const logo = require('../../assets/images/logo.svg');

export interface IAppUIStateProps {
    network_status?: boolean;
    message?: string;
}

export interface IAppUIDispatchProps {
    notifyAppOnline: () => void;
    notifyAppOffline: () => void;
}

interface IAppUIProps extends IAppUIStateProps, IAppUIDispatchProps {
}

export interface IAppUIState {
  notify: boolean;
}

class AppUI extends React.Component<IAppUIProps, IAppUIState> {
  constructor(props: IAppUIDispatchProps) {
    super(props);

    window.addEventListener('online', (event) => {
        this.props.notifyAppOnline();
      }
    );

    window.addEventListener('offline', (event) => this.props.notifyAppOffline());

    this.state = {
      notify: false,
    };
  }

  componentWillReceiveProps(nextProps: IAppUIProps) {
    if (nextProps.network_status) {
      this.notifyAppOnline();
    } else {
      this.notifyAppOffline();
    }
  }

  notifyAppOffline() {
    this.setState({
      notify: true,
    });
  }

  notifyAppOnline() {
    this.setState({
      notify: true,
    });
  }

  render() {
    const  HeaderContainer = Header.Container;
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
        <Snackbar open={this.state.notify} message={this.props.message || ''}/>
      </div>
    );
  }
}

export default AppUI;
