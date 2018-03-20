import { connect, Dispatch } from 'react-redux';
import DrawerUI, { IDrawerUIStateProps, IDrawerUIDispatchProps } from './DrawerUI';
import { getDrawerOpenStatus } from '../../selectors/drawer';
import { IStoreState } from '../../types';
import { closeDrawer, DrawerActions } from '../../actions';

export interface IDrawerProps {
}

const mapStateToProps = (state: IStoreState, ownProps: IDrawerProps): IDrawerUIStateProps => {
    const open = getDrawerOpenStatus(state);
    const result = {
        open
    };
    return result;
};

const mapDispatchToProps = (dispatch: Dispatch<DrawerActions>): IDrawerUIDispatchProps => {
    return {
        closeDrawer: () => dispatch(closeDrawer())
    };
};

const Drawer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawerUI);

export default Drawer;
