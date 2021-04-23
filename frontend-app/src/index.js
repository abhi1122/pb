import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './redux/reducers';

import './index.css';
import Home from './containers/Home/index';
import reportWebVitals from './reportWebVitals';

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          {/* <Route path="/about">
          <About />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route> */}
        </Switch>
        {/* <App /> */}
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
