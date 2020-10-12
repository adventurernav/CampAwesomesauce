import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './CSS/main.css';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
const theme = createMuiTheme({
  palette: {
     primary: {
        light: 'rgb(255,214,215)',
        main: 'rgb(244,82,134)',
        dark: 'rgb(13,9,8)'
     },
     secondary: {
       light: 'rgb(254,239,236)',
       main: 'rgb(161,74,118)',
       dark: 'rgb(13,9,8)'
     },
  }
});
ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme = {theme}>
    <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
