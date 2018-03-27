import * as React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

export interface IDrawerUIStateProps {
    open: boolean;
}

export interface IDrawerUIDispatchProps {
  closeDrawer: () => void;
}

interface IDrawerUIProps extends IDrawerUIStateProps, IDrawerUIDispatchProps {
}

export default class DrawerOpenRightExample extends React.Component<IDrawerUIProps, {}> {
  public render(): React.ReactElement<HTMLElement> {
    return (
      <div>
        <Drawer
          width={200}
          open={this.props.open}
          docked={false}
          onRequestChange={(open) => this.handleCloseDrawer()}
        >
          <AppBar 
            title="AppBar"
            iconElementLeft={<IconButton aria-label="Close menu"><NavigationMenu /></IconButton>}
            onLeftIconButtonClick={() => this.handleCloseDrawer()}
          />
        </Drawer>
      </div>
    );
  }

  private handleCloseDrawer(): void {
    this.props.closeDrawer();
  } 
}