import React from 'react';
import ReactDOM from 'react-dom/client';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './App';
import reducer from './reducers/anecdoteReducer';
import FilterReducer from './reducers/filterReducer';

const combinedReducer = combineReducers({
  anecdotes: reducer,
  filter: FilterReducer,
});

const store = createStore(combinedReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)