import { connect, Dispatch } from 'react-redux';
import AppUI, { IAppUIStateProps, IAppUIDispatchProps } from './AppUI';
import { IStoreState } from '../../types';
import { appOnline, appOffline, NetworkStatusActions } from '../../actions';
import { getNetworkStatus, getNetworkStatusMessage } from '../../selectors/network_status';

const mapStateToProps = (state: IStoreState): IAppUIStateProps => {
    const result = {
        network_status: getNetworkStatus(state),
        message: getNetworkStatusMessage(state)
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
