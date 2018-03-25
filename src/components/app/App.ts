import { connect, Dispatch } from 'react-redux';
import AppUI, { IAppUIStateProps, IAppUIDispatchProps } from './AppUI';
import { IStoreState } from '../../types';
import { appOnline, appOffline, NetworkStatusActions } from '../../actions';

import { pushNotificationCtrl as pushNotificationCtrlInstance } from '../../index';
import { firebaseCtl as firebaseCtlInstance } from '../../index';

const mapStateToProps = (state: IStoreState): IAppUIStateProps => {
    const result = {
        pushNotificationCtrl: pushNotificationCtrlInstance,
        firebaseCtl: firebaseCtlInstance
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
