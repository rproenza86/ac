import * as React from 'react';
import './HeaderUI.css';
import Drawer from '../drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

export interface IHeaderUIStateProps {
}

export interface IHeaderUIDispatchProps {
    openDrawer?: () => void;
}

export interface IHeaderUIState {
}

interface IHeaderUIProps extends IHeaderUIStateProps, IHeaderUIDispatchProps {
}

class HeaderUI extends React.Component<IHeaderUIProps, IHeaderUIState> {
    constructor(props: IHeaderUIProps) {
        super(props);
    }

    handleOpenDrawer(): void {
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
                    iconElementLeft={<IconButton aria-label="Open menu"><NavigationMenu /></IconButton>}
                    onLeftIconButtonClick={() => this.handleOpenDrawer()}
                />
                <DrawerContainers/>
            </div>
        );
    }
}

export default HeaderUI;
