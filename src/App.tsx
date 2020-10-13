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
user: {role:string}
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
  requestHeaders: any = { 'Content-Type': 'application/json', 'Authorization': currentToken };
  tokenChecker(){
    
    fetch(`${APIURL}/tokenchecker/`, {
      headers: this.requestHeaders
  })
      .then(res => res.json())
      .then((data:tokenResponse) => {
          if (data.message==='Success'){
            this.setState({authenticated:true})
          }
          if (data.user.role==='admin'){
            this.setState({admin:true})
          }
      })
      .catch(err=>console.log(err))
  }
  updateToken(newToken: string, authenticated: boolean): void {
    this.setState({ token: newToken, authenticated: authenticated })
  }
  updateAdmin(admin: boolean):void {
    this.setState({admin:admin})
  }
  componentDidMount(){
    if (currentToken){
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
