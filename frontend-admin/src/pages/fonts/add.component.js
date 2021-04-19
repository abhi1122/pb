import React from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  Label,
  InputGroup,
  FormGroup,
  Alert,
  InputGroupAddon,
  InputGroupText,
  UncontrolledAlert,
} from 'reactstrap';
import {
  getFonts,
  saveFonts,
  editForm,
  updateFonts,
} from '../../actions/fonts';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Widget from '../../components/Widget/Widget';
import {
  InputValidationError,
  SectionHeader,
} from '../../helpers/components/common-ui';

// import './index.module.scss';

class FontsAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', fnt: {}, png: {}, fonts: [], status: true };
  }

  componentDidMount() {
    if (this.props && this.props.match.params.id) {
      this.props.dispatch(
        getFonts({ searchQuery: { _id: this.props.match.params.id } })
      );
    }
  }

  changeName = (e) => {
    //this.setState({ name: event.target.value });
    this.props.dispatch(editForm({ name: e.target.value }));
  };

  onFileChange = (event) => {
    console.log(event.target.files, '...event.target.files');
    //this.setState({ fnt: event.target.files[0] });
    this.props.dispatch(editForm({ fnt: event.target.files[0] }));
    //this.setState({ fonts: [...this.state.fonts, event.target.files[0]] });
  };

  onFileChange2 = (event) => {
    //this.setState({ fonts: [...this.state.fonts, event.target.files[0]] });
    //this.setState({ png: event.target.files[0] });
    this.props.dispatch(editForm({ png: event.target.files[0] }));
    console.log(this.state, 'sate.....');
  };

  save = (e) => {
    const { name, status, png, fnt, _id } = this.props.formData;
    e.preventDefault();
    const formData = new FormData();
    _id && formData.append('id', _id);
    formData.append('name', name);
    formData.append('status', status);
    formData.append('fonts', png);
    formData.append('fonts', fnt);
    if (_id) {
      this.props.dispatch(updateFonts(formData));
    } else {
      this.props.dispatch(saveFonts(formData));
    }
  };

  changeCheck = (e) => {
    //this.setState({ status: e.target.checked });
    this.props.dispatch(editForm({ status: e.target.checked }));
  };

  render() {
    console.log(this.props, '././././././');
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
                      value={this.props.formData.name}
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

                <FormGroup className='mt'>
                  <div className='abc-checkbox'>
                    <Input
                      id='status'
                      type='checkbox'
                      checked={this.props.formData.status}
                      onChange={(event) => this.changeCheck(event)}
                    />

                    <Label for='status' />
                    <spam>Do you want to activate this</spam>
                  </div>
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
    formData: state.fonts.formData,
  };
}

export default withRouter(connect(mapStateToProps)(FontsAdd));
