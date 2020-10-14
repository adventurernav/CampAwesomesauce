import React, { Component } from 'react';
import './CSS/main.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './Site/Header'
import Footer from './Site/Footer'
import SwitchController from './Site/SwitchController'
import APIURL from './helpers/environment'

type AppState = {
  token: string | null,
  authenticated: boolean,
  admin: boolean
}
type tokenResponse = {
  message: string
  user: { role: string }
}
let currentToken = window.localStorage.getItem('token')
class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      authenticated: false,
      token: currentToken,
      admin: false
    }
    this.updateToken = this.updateToken.bind(this)
    this.updateAdmin = this.updateAdmin.bind(this)
  }
  tokenChecker():void {
    if (currentToken && this.state.authenticated===false) {
      console.log('TOKEN CHECKER')
      fetch(`${APIURL}/tokenchecker/`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': currentToken
        })
      })
        .then(res => res.json())
        .then((data: tokenResponse) => {
          console.log(data)
          if (data.message === 'Success') {
            this.setState({ authenticated: true })
console.log('check token message success')
          }
          if (data.user.role === 'admin') {
            this.setState({ admin: true })
            console.log('check admin')

          }
        })
        .catch(err => console.log(err))
    }
  }
  updateToken(newToken: string, authenticated: boolean): void {
    this.setState({ token: newToken, authenticated: authenticated })
  }
  updateAdmin(admin: boolean): void {
    this.setState({ admin: admin })
  }
  componentDidMount() {
    if (currentToken) {
      this.tokenChecker()
    }
  }
  // componentWillUnmount(): void {
  //   this.updateToken('', false);
  //   window.localStorage.removeItem('token')
  // }
  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Header appState={this.state} />
          </header>
          <SwitchController updateToken={this.updateToken} updateAdmin={this.updateAdmin} appState={this.state} />
          <footer className="App-footer">
            <Footer />
          </footer>
        </Router>
      </div>
    );
  }
}

export default App;
