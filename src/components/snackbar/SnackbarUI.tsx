import * as React from 'react';
import Snackbar from 'material-ui/Snackbar';

export interface ISnackbarUIProps {
  open: boolean;
  message: string;
}

export interface ISnackbarUIState {
  open: boolean;
  autoHideDuration: number;
  message: string;
}

export default class SnackbarUI extends React.Component<ISnackbarUIProps, ISnackbarUIState> {

  public constructor(props: ISnackbarUIProps) {
    super(props);

    this.state = {
      autoHideDuration: 4000,
      message: 'Something just happen in the app',
      open: props.open,
    };
  }

  public componentWillReceiveProps(nextProps: ISnackbarUIProps): void {
    this.setState({
      open: nextProps.open
    });
  }

  public render(): React.ReactElement<HTMLElement> {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={this.props.message || this.state.message}
          autoHideDuration={this.state.autoHideDuration}
          onRequestClose={this.handleRequestClose}
          action="Ok"
          onActionClick={this.handleRequestClose}
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
