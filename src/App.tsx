import React, { Component } from 'react';
import './CSS/main.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './Site/Header'
import Footer from './Site/Footer'
import SwitchController from './Site/SwitchController'

type AppState = {
  token: string | null,
  authenticated: boolean,
  admin: boolean | null
}
let currentToken = window.localStorage.getItem('token')
let authCheck = currentToken ? true : false
class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      authenticated: authCheck,
      token: currentToken,
      admin: null
    }
    this.updateToken = this.updateToken.bind(this)
    this.updateAdmin = this.updateAdmin.bind(this)
  }
  updateToken(newToken: string, authenticated: boolean): void {
    this.setState({ token: newToken, authenticated: authenticated })
  }
  updateAdmin(admin: boolean):void {
    this.setState({admin:admin})
  }
  componentWillUnmount(): void {
    this.updateToken('', false);
    window.localStorage.removeItem('token')
  }
  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Header appState={this.state}/>
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
