'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TopMenu from './components/topmenu.jsx';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class Layout extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <TopMenu />
      </MuiThemeProvider>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);
