import React, { Component } from 'react'
//import './App.css'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import firebase from 'firebase'
import database from './firebase.js'

import MainScreen from './components/MainScreen'

const styles = {
  root: {
    flexGrow: 1,
  },
  button: {
    marginRight: 0,
  },
  title: {
    margin: 'auto',
    fontSize: 70
  },

}
class App extends Component {

  state = {
    authenticated: false,
    user: null
  }

  render() {
    const { classes } = this.props
    return (
      <div className="App">

        <div className="Header">
          <AppBar position="static" className={classes.root}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.title}>
                CodeHub
              </Typography>
              {this.state.authenticated 
                ? <Button onClick={() => this.logout()}>Logout</Button>
                : <Button onClick={() => this.validateForm()}>Login</Button>
              }
            </Toolbar>
          </AppBar>
        </div>
        <div className="Main">
          {this.state.authenticated ? <MainScreen database={database} user={this.state.user}/> : <p></p>}
        </div>
      </div>
    );
  }

  logout() {
    database.auth().signOut()
    .then(() => {
      this.setState({
        authenticated: false,
        user: null
      })
    })
  }

  validateForm() {
    var provider = new firebase.auth.GoogleAuthProvider()
    database.auth().signInWithPopup(provider)
    .then((result) => {
        var users = database.database().ref().child("users")
        users.orderByChild("uid").equalTo(result.user.uid).once("value",snapshot => {
          if (!snapshot.exists()){
            users.push().set({ 
              user: result.user.displayName,
              uid: result.user.uid
            })
          }
        })
        this.setState({
            user: result.user,
            authenticated: true
        })
    })
  }
}

export default withStyles(styles) (App)
