/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */

import firebase from 'firebase';

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: null,
    };
  }

  // Mainコンポーネントがマウントされる直前に実行される
  componentWillMount = () => {
    firebase.auth().getRedirectResult()
      .then((result) => this.setState({user: result.user}))
      // .catch((err) => console.log('auth error', err))
      // .catch書かなかったらErrorがthrowされる

      // FIXME: loading表示
  }

  handleTouchTap = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    const login = (
      <div style={styles.container}>
        <h1>Firebase TODO</h1>
        <RaisedButton
          label="Googleアカウントでログイン"
          secondary={true}
          onTouchTap={this.handleTouchTap}
        />
      </div>
    );

    const top = (
      <div>ログイン成功したよ</div>
    )

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        {this.state.user ? top : login}
      </MuiThemeProvider>
    );
  }
}

export default Main;
