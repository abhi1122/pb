import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container,
  Alert,
  Button,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
} from 'reactstrap';
import Widget from '../../components/Widget';
import { loginUser } from '../../actions/user';
//import microsoft from '../../assets/microsoft.png';

class Login extends React.Component {
  //   static propTypes = {
  //     dispatch: PropTypes.func.isRequired,
  //   };

  static isAuthenticated() {
    const token = localStorage.getItem('authenticated');
    console.log(token, '......token');
    if (token) return true;
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.doLogin = this.doLogin.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  doLogin(e) {
    e.preventDefault();
    this.props.dispatch(
      loginUser({
        email: this.state.email,
        password: this.state.password,
      })
    );
  }

  changeInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //   signUp() {
  //     this.props.history.push('/register');
  //   }

  render() {
    console.log(this.props, 'this.state.auth......111111');
    const { from } = this.props.location.state || {
      from: {
        pathname: '/admin/dashboard',
      },
    }; // eslint-disable-line

    if (Login.isAuthenticated()) {
      return <Redirect to={from} />;
    }

    return (
      <div className='auth-page'>
        <Container>
          <Widget
            className='widget-auth mx-auto'
            title={<h3 className='mt-0'> Login to your Web App </h3>}
          >
            <p className='widget-auth-info'>Use your email to sign in .</p>
            <form onSubmit={this.doLogin}>
              {this.props.errorMessage && (
                <Alert
                  className='alert-sm widget-middle-overflow rounded-0'
                  color='danger'
                >
                  {this.props.errorMessage}
                </Alert>
              )}
              <FormGroup className='mt'>
                <Label for='email'> Email </Label>
                <InputGroup className='input-group-no-border'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='la la-user text-white' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id='email'
                    className='input-transparent pl-3'
                    value={this.state.email}
                    onChange={this.changeInput}
                    type='email'
                    required
                    name='email'
                    placeholder='Email'
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for='password'> Password </Label>
                <InputGroup className='input-group-no-border'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='la la-lock text-white' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id='password'
                    className='input-transparent pl-3'
                    value={this.state.password}
                    onChange={this.changeInput}
                    type='password'
                    required
                    name='password'
                    placeholder='Password'
                  />
                </InputGroup>
              </FormGroup>
              <div className='bg-widget auth-widget-footer'>
                <Button
                  type='submit'
                  color='danger'
                  className='auth-btn'
                  size='sm'
                  style={{
                    color: '#fff',
                  }}
                >
                  <span
                    className='auth-btn-circle'
                    style={{
                      marginRight: 8,
                    }}
                  >
                    <i className='la la-caret-right' />
                  </span>
                  {this.props.isFetching ? 'Loading...' : 'Login'}
                </Button>
              </div>
            </form>
          </Widget>
        </Container>
        <footer className='auth-footer'></footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
