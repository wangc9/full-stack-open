import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './reducers/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
