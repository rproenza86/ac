import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import './styles/global.css';

import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import { IStoreState } from './types';
import { Provider } from 'react-redux';

// tslint:disable-next-line:no-any
const windowDoc = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const reduxDevTools = typeof window === 'object' && windowDoc;
const composeEnhancers = reduxDevTools ?
    windowDoc({
        name: 'Atomic Coders LCC'
    }) : compose;

const store = createStore<IStoreState>(rootReducer, composeEnhancers());

const muiTheme = getMuiTheme({
  palette: {
    primary2Color: '#303F9F',
    primary1Color: '#3F51B5'
  }
});

const MaterialWrapper = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  <MaterialWrapper />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

firebase.initializeApp({
  'apiKey': 'AIzaSyBFYpHBN-TmD-TUxQtVXgSFS7s7soUwnbA',
  'databaseURL': 'https://atomic-coders.firebaseio.com',
  'storageBucket': 'atomic-coders.appspot.com',
  'authDomain': 'atomic-coders.firebaseapp.com',
  'messagingSenderId': '396010841523',
  'projectId': 'atomic-coders'
});