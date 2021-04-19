import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import IdleTimer from 'react-idle-timer';

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
  constructor(props) {
    super(props);
    this.idleTimer = null;
    //this.handleOnAction = this.handleOnAction.bind(this);
    //this.handleOnActive = this.handleOnActive.bind(this);
    this.handleOnIdle = this.handleOnIdle.bind(this);
  }

  // handleOnAction(event) {
  //   console.log('user did something', event);
  // }

  // handleOnActive(event) {
  //   console.log('user is active', event);
  //   console.log('time remaining', this.idleTimer.getRemainingTime());
  // }

  handleOnIdle(event) {
    console.log('user is idle');
    this.props.history.push('/login');
  }
  render() {
    return (
      <div>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          timeout={1000 * 60 * 15}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
        {/* <ToastContainer
          autoClose={5000}
          hideProgressBar
          closeButton={<CloseButton />}
        /> */}
        <HashRouter>
          <Switch>
            <PrivateRoute
              path='/admin'
              dispatch={this.props.dispatch}
              component={LayoutComponent}
            />
            {/* <Route path='/register' exact component={Register} /> */}
            <Route path='/login' exact component={Login} />
            <Route path='/error' exact component={ErrorPage} />
            {/* <Route component={ErrorPage} />
            <Redirect from='*' to='/admin/dashboard' /> */}
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
