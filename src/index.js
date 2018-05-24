import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/sass/main.css';
import registerServiceWorker from './registerServiceWorker';

// import { Provider } from 'react-redux';
//import AppRouter from './routers/AppRouter';
// import configureStore from './store/configureStore';

ReactDOM.render(<AppRouter/>, document.getElementById('root'));
registerServiceWorker();
  