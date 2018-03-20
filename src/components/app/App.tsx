import * as React from 'react';
import './App.css';
import Header from '../header';

const logo = require('../../assets/images/logo.svg');

class App extends React.Component {
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
      </div>
    );
  }
}

export default App;
