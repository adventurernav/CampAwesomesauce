import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './CSS/main.css';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
const theme = createMuiTheme({
  palette: {
     primary: {
        light: '#ffd6d7',
        main: 'rgb(244,82,134)',
        dark: '#0d0908'
     },
     secondary: {
       light: '#feefec',
       main: '#a14176',
       dark: '#0d0908'
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
