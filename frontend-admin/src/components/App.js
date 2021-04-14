import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

/* eslint-disable */
import ErrorPage from '../pages/error';
/* eslint-enable */

import '../styles/theme.scss';
import LayoutComponent from '../components/Layout';
import Login from '../pages/login';
import Register from '../pages/register';
import { logoutUser } from '../actions/user';

const PrivateRoute = ({ dispatch, component, ...rest }) => {
  console.log('enter PrivateRoute......');
  if (
    !Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))
  ) {
    return <Redirect to='/login' />;
  } else {
    console.log('enter else.....');
    return (
      // eslint-disable-line
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  }
};

const CloseButton = ({ closeToast }) => (
  <i onClick={closeToast} className='la la-close notifications-close' />
);

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <ToastContainer
          autoClose={5000}
          hideProgressBar
          closeButton={<CloseButton />}
        />
        <HashRouter>
          <Switch>
            <PrivateRoute
              path='/admin'
              dispatch={this.props.dispatch}
              component={LayoutComponent}
            />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <Route path='/error' exact component={ErrorPage} />
            <Route component={ErrorPage} />
            <Redirect from='*' to='/admin/dashboard' />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
