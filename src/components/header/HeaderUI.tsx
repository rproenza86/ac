import * as React from 'react';
import { Component } from 'react';
import './HeaderUI.css';
import AppBar from 'material-ui/AppBar';
import Drawer from '../drawer';

export interface IHeaderUIStateProps {
}

export interface IHeaderUIDispatchProps {
    openDrawer?: () => void;
}

export interface IHeaderUIState {
}

interface IHeaderUIProps extends IHeaderUIStateProps, IHeaderUIDispatchProps {
}

class HeaderUI extends Component<IHeaderUIProps, IHeaderUIState> {
    constructor(props: IHeaderUIProps) {
        super(props);
    }

    handleOpenDrawer() {
        if (this.props.openDrawer) {
            this.props.openDrawer();
        }
    }

    render() {
        const DrawerContainers = Drawer.Container;
        return (
            <div>
                <AppBar
                    title="Atomic Coders"
                    className="header-main"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={() => this.handleOpenDrawer()}
                />
                <DrawerContainers/>
            </div>
        );
    }
}

export default HeaderUI;
