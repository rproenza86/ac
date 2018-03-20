import * as React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

export interface IDrawerUIStateProps {
}

export interface IDrawerUIDispatchProps {
}

interface IDrawerUIProps extends IDrawerUIStateProps, IDrawerUIDispatchProps {
}

export interface IDrawerUIState {
    open: boolean;
}

export default class DrawerOpenRightExample extends React.Component<IDrawerUIProps, IDrawerUIState> {

  constructor(props: React.Props<IDrawerUIProps>) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onClick={this.handleToggle}
        />
        <Drawer width={200} open={this.state.open} >
          <AppBar title="AppBar" />
        </Drawer>
      </div>
    );
  }
}