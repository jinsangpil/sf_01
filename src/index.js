/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { Router, Scene } from 'react-native-router-flux';
import Main from './main';
import Standard from './standard/standard';
import Touch from './touch/touch';

export default class InitApp extends Component {
  render() {
    return (
        <Router hideNavBar= "true">
          <Scene key="root">
            <Scene key="main" component={Main} title="Main" initial={true} />
            <Scene key="standard" component={Standard} title="Standard" />
            <Scene key="touch" component={Touch} title="Touch" />
          </Scene>
        </Router>
    );
  }
}
