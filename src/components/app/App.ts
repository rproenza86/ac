import { connect, Dispatch } from 'react-redux';
import AppUI, { IAppUIStateProps, IAppUIDispatchProps } from './AppUI';
import { IStoreState } from '../../types';
import { appOnline, appOffline, NetworkStatusActions } from '../../actions';

const mapStateToProps = (state: IStoreState): IAppUIStateProps => {
    return {};
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
