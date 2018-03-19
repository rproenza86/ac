import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import './styles/global.css';

const MaterialWrapper = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(
  <MaterialWrapper />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
