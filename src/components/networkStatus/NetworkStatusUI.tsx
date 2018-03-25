import * as React from 'react';
import Snackbar from 'material-ui/Snackbar';

export interface INetworkStatusUIProps {
  network_status: boolean;
  message: string;
}

export interface INetworkStatusUIState {
  open: boolean;
  autoHideDuration: number;
  message: string;
}

export default class NetworkStatusUI extends React.Component<INetworkStatusUIProps, INetworkStatusUIState> {

  public constructor(props: INetworkStatusUIProps) {
    super(props);

    this.state = {
      autoHideDuration: 4000,
      message: 'Something just happen in the app',
      open: false,
    };
  }

  public componentWillReceiveProps(nextProps: INetworkStatusUIProps): void {
    if (nextProps.network_status !== this.props.network_status) {
      this.setState({
        open: true
      });
    }
  }

  public render(): React.ReactElement<HTMLElement> {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={this.props.message || this.state.message}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={() => this.handleRequestClose()}
          action="Ok"
          onActionClick={() => this.handleRequestClose()}
        />
      </div>
    );
  }

  private handleRequestClose(): void {
    this.setState({
      open: false
    });
  }
}
