import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
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
composeEnhancers();
// TODO: Check why composeEnhancers create error, fix it an use it

// tslint:disable:no-any
const store = createStore<IStoreState>(rootReducer,
                                       (window as any).__REDUX_DEVTOOLS_EXTENSION__
                                       && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
// tslint:enable:no-any

const MaterialWrapper = () => (
  <MuiThemeProvider>
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
