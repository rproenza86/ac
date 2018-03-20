import * as React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

export interface IDrawerUIStateProps {
    open: boolean;
}

export interface IDrawerUIDispatchProps {
  closeDrawer: () => void;
}

interface IDrawerUIProps extends IDrawerUIStateProps, IDrawerUIDispatchProps {
}

export default class DrawerOpenRightExample extends React.Component<IDrawerUIProps, {}> {
  handleCloseDrawer = () => this.props.closeDrawer();

  render() {
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
            onLeftIconButtonClick={() => this.handleCloseDrawer()}
          />
        </Drawer>
      </div>
    );
  }
}