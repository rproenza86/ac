import { connect } from 'react-redux';
import NetworkStatusUI, { INetworkStatusUIProps } from './NetworkStatusUI';
import { IStoreState } from '../../types';
import { getNetworkStatus, getNetworkStatusMessage } from '../../selectors/network_status';

const mapStateToProps = (state: IStoreState): INetworkStatusUIProps => {
    const result = {
        network_status: getNetworkStatus(state),
        message: getNetworkStatusMessage(state)
    };
    return result;
};

const mapDispatchToProps = () => {
    return {};
};

const NetworkStatus = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetworkStatusUI);

export default NetworkStatus;
