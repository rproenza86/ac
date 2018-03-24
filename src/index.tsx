import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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

const store = createStore<IStoreState>(rootReducer, composeEnhancers());

const muiTheme = getMuiTheme({
  palette: {
    primary2Color: '#303F9F',
    primary1Color: '#3F51B5'
  }
});

const AppContainer = App.Container;

const MaterialWrapper = (): React.ReactElement<HTMLElement> => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  <MaterialWrapper />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
