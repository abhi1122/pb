import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import { HashRouter } from "react-router-dom";
//import IdleTimer from "react-idle-timer";
import LayoutComponent from "../components/Layout/Layout";

// const UserRoute = ({ dispatch, component, ...rest }) => {
//   if (
//     !Login.isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))
//   ) {
//     return <Redirect to="/login" />;
//   } else {
//     console.log("enter else.....");
//     return (
//       // eslint-disable-line
//       <Route
//         {...rest}
//         render={(props) => React.createElement(component, props)}
//       />
//     );
//   }
// };

const GuestRoute = ({ dispatch, component, ...rest }) => {
  return (
    // eslint-disable-line
    <Route
      {...rest}
      render={(props) => React.createElement(component, props)}
    />
  );
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.idleTimer = null;
    // this.handleOnIdle = this.handleOnIdle.bind(this);
  }

  // handleOnAction(event) {
  //   console.log('user did something', event);
  // }

  // handleOnActive(event) {
  //   console.log('user is active', event);
  //   console.log('time remaining', this.idleTimer.getRemainingTime());
  // }
  // handleOnIdle = (event) => {
  //   console.log("user is idle");
  //   //this.props.history.push('/login');
  //   localStorage.removeItem("authenticated");
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   if (typeof window !== "undefined") {
  //     window.location.href = "/#/login";
  //   }
  // };

  render() {
    return (
      <div>
        {/* <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          timeout={1000 * 60 * 15}
          onIdle={this.handleOnIdle}
          debounce={250}
        /> */}

        <HashRouter>
          <Switch>
            {/* <UserRoute
              path="/user"
              dispatch={this.props.dispatch}
              component={LayoutComponent}
            /> */}
            <GuestRoute
              path="/"
              dispatch={this.props.dispatch}
              component={LayoutComponent}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  core: state.core,
});

export default connect(mapStateToProps)(App);
