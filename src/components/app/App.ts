import { connect, Dispatch } from 'react-redux';
import AppUI, { IAppUIStateProps, IAppUIDispatchProps } from './AppUI';
import { IStoreState } from '../../types';
import { appOnline, appOffline, NetworkStatusActions } from '../../actions';
import SwPushNotificationCtrl from '../../services/swPushNotificationCtrl';
import * as firebase from 'firebase';

const firebaseConfig = require('../../config/firebase.json');
const firebaseCtl = firebase.initializeApp(firebaseConfig);

const mapStateToProps = (state: IStoreState): IAppUIStateProps => {
    const result = {
        pushNotificationCtrl: new SwPushNotificationCtrl(
            'BLok2rQc1b61_eyJ_t9uH4t7DhAUuxGl-Tker6c1IlJ8RYcLxtCj1UlylxemCnnnZEnDwF6ab8np5OS0RVAfeXk', 
            firebaseCtl),
        firebaseCtl
    };
    return result;
};

const mapDispatchToProps = (dispatch: Dispatch<NetworkStatusActions>): IAppUIDispatchProps => {
    return {
        notifyAppOnline: () => dispatch(appOnline()),
        notifyAppOffline: () => dispatch(appOffline())
    };
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppUI);

export default App;
