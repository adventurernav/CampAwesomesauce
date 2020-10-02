import React, { Component } from 'react';
import './CSS/main.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './Site/Header'
import Footer from './Site/Footer'
import SwitchController from './Site/SwitchController'

type AppState = {
  token: string,
  authenticated: boolean
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      authenticated: false,
      token: ''
    }
    this.updateToken = this.updateToken.bind(this)
  }
updateToken (newToken:string, authenticated:boolean):void {
this.setState({token: newToken, authenticated: authenticated})
}
  render() {
    return (
      <div className="App">
          <Router>
            <header className="App-header">
              <Header />
            </header>
            <SwitchController updateToken={this.updateToken} appState={this.state} />
            <footer className="App-footer">
              <Footer />
            </footer>
          </Router>
      </div>
    );
  }
}

export default App;
