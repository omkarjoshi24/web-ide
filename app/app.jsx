'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TopMenu from './components/topmenu.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

export default class Layout extends React.Component {
  render() {
    return (
      <TopMenu />
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);
