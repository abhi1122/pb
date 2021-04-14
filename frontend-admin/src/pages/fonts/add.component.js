import React from 'react';
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
  InputGroup,
  FormGroup,
  Alert,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { getFonts, saveFonts } from '../../actions/fonts';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import Widget from '../../components/Widget/Widget';
import {
  InputValidationError,
  SectionHeader,
} from '../../helpers/components/common-ui';

// import './index.module.scss';

class FontsAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', fnt: {}, png: {}, fonts: [] };
  }

  componentDidMount() {
    if (this.props && this.props.match.params.id) {
      this.props.dispatch(getFonts());
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps, prevState);
    // if (nextProps.saved) {
    //   nextProps.history.push('admin/fonts/list');
    // }
  }

  changeName = (event) => {
    this.setState({ name: event.target.value });
  };

  onFileChange = (event) => {
    console.log(event.target.files, '...event.target.files');
    this.setState({ fnt: event.target.files[0] });
    //this.setState({ fonts: [...this.state.fonts, event.target.files[0]] });
  };

  onFileChange2 = (event) => {
    //this.setState({ fonts: [...this.state.fonts, event.target.files[0]] });
    this.setState({ png: event.target.files[0] });
    console.log(this.state, 'sate.....');
  };

  save = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('fonts', this.state.png);
    formData.append('fonts', this.state.fnt);
    this.props.dispatch(saveFonts(formData));
    // let fontArr = [];
    // fontArr.push(this.state.png);
    // fontArr.push(this.state.fnt);
    // this.setState({ fonts: fontArr }, () => {
    //   console.log(this.state, '......this.state', fontArr);
    //   this.props.dispatch(saveFonts(this.state));
    // });

    // if (!this.isPasswordValid()) {
    //   this.checkPassword();
    // } else {
    //   this.props.dispatch(
    //     registerUser({
    //       creds: {
    //         email: this.state.email,
    //         password: this.state.password,
    //       },
    //       history: this.props.history,
    //     })
    //   );
    // }
  };

  render() {
    if (this.props.saved) {
      return <Redirect to='/admin/fonts' />;
    }
    console.log(this.props.fonts, '...this.props.fonts');
    return (
      <div>
        <Row>
          <Col>
            <Widget>
              <SectionHeader
                headName='Add New Font'
                headButtonName='Font List'
                headButtonUrl='/admin/fonts'
                props={this.props}
              />
              <p className='widget-auth-info'>Please fill all fields below.</p>
              <br />
              <form onSubmit={this.save} enctype='multipart/form-data'>
                {this.props.errorMessage && (
                  <Alert
                    className='alert-sm widget-middle-overflow rounded-0'
                    color='danger'
                  >
                    {this.props.errorMessage}
                  </Alert>
                )}
                <FormGroup className='mt'>
                  <Label for='name'>Font Name</Label>
                  <InputGroup className='input-group-no-border'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='la la-user text-white' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id='name'
                      className='input-transparent pl-3'
                      value={this.state.name}
                      onChange={this.changeName}
                      type='text'
                      name='name'
                      placeholder='Font Name'
                    />
                  </InputGroup>
                  <InputValidationError error={this.props.errors.name} />
                </FormGroup>

                <br />

                <FormGroup className='mt'>
                  <Label for='name'>
                    Select Font Type (.ttf.fnt) Ex (Montserrat-Regular.ttf.fnt)
                  </Label>
                  <InputGroup className='input-group-no-border'>
                    <Input
                      id='name'
                      className='input-transparent pl-3'
                      // value={this.state.name}
                      type='file'
                      name='name'
                      placeholder='Name'
                      onChange={this.onFileChange}
                    />
                  </InputGroup>
                  <InputValidationError error={this.props.errors.fonts} />
                </FormGroup>

                <br />

                <FormGroup className='mt'>
                  <Label for='name'>
                    Select Font Type .png Ex (Montserrat-Thin.ttf_0.png)
                  </Label>
                  <InputGroup className='input-group-no-border'>
                    <Input
                      id='name'
                      className='input-transparent pl-3'
                      // value={this.state.name}
                      type='file'
                      name='name'
                      placeholder='Name'
                      onChange={this.onFileChange2}
                    />
                  </InputGroup>
                  <InputValidationError error={this.props.errors.fonts} />
                </FormGroup>

                <br />
                <br />

                <div className='bg-widget-transparent auth-widget-footer'>
                  <Button
                    type='submit'
                    color='danger'
                    className='auth-btn'
                    style={{ color: '#fff' }}
                  >
                    {this.props.isFetching ? 'Loading...' : 'Create'}
                  </Button>
                </div>
              </form>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved: state.fonts.saved,
    errors: state.fonts.errors,
  };
}

export default withRouter(connect(mapStateToProps)(FontsAdd));
