import * as React from 'react';
import { Component } from 'react';
import './HeaderUI.css';
import AppBar from 'material-ui/AppBar';

export interface IHeaderUIStateProps {
}

export interface IHeaderUIDispatchProps {
}

export interface IHeaderUIState {
}

interface IHeaderUIProps extends IHeaderUIStateProps, IHeaderUIDispatchProps {
}

class HeaderUI extends Component<IHeaderUIProps, IHeaderUIState> {
    constructor(props: IHeaderUIProps) {
        super(props);
    }

    render() {
        return (
            <AppBar
              title="Atomic Coders"
              className="header-main"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        );
    }
}

export default HeaderUI;
