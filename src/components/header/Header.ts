import { connect, Dispatch } from 'react-redux';
import HeaderUI from './HeaderUI';
import { IHeaderUIStateProps, IHeaderUIDispatchProps } from './HeaderUI';
import { IStoreState } from '../../types';
import { openDrawer, IOpenDrawer } from '../../actions';

export interface IHeaderProps {
}

type IHeaderActions = IOpenDrawer;

const mapStateToProps = (state: IStoreState, ownProps: IHeaderProps): IHeaderUIStateProps => {
    const result = {
    };
    return result;
};

const mapDispatchToProps = (dispatch: Dispatch<IHeaderActions>): IHeaderUIDispatchProps => {
    return {
        openDrawer: () => dispatch(openDrawer())
    };
};

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderUI);

export default Header;
