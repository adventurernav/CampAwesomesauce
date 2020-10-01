import React from 'react';
import './CSS/main.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './Site/Header'
import Footer from './Site/Footer'
import SwitchController from './Site/SwitchController'


function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Header />
        </header>
        <SwitchController />
        <footer className="App-footer">
          <Footer />
        </footer>
      </Router>

    </div>
  );
}

export default App;
