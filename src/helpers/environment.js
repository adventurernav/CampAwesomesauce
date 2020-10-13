//decides whether on local host or heroku
let APIURL = '';
switch(window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000'
        break;
    case 'campawesomesauce.herokuapp.com':
        APIURL = 'https://server-campawesomesauce.herokuapp.com'
}
export default APIURL;