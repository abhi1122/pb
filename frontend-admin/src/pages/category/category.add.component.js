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
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import Widget from '../../components/Widget/Widget';
import {
  InputValidationError,
  SectionHeader,
} from '../../helpers/components/common-ui';

import { getList, saveForm } from '../../actions/category';

// import './index.module.scss';

class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', fnt: {}, png: {}, fonts: [] };
  }

  componentDidMount() {
    if (this.props && this.props.match.params.id) {
      this.props.dispatch(getList());
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  save = (e) => {
    e.preventDefault();
    this.props.dispatch(saveForm({ name: this.state.name }));
  };

  render() {
    if (this.props.saved) {
      return <Redirect to='/admin/categories' />;
    }
    console.log(this.props.fonts, '...this.props.fonts');
    return (
      <div>
        <Row>
          <Col>
            <Widget>
              <SectionHeader
                headName='Add New Category'
                headButtonName='Category List'
                headButtonUrl='/admin/categories'
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
                  <Label for='name'>Category Name</Label>
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
                      onChange={this.changeInput}
                      type='text'
                      name='name'
                      placeholder='Category Name'
                    />
                  </InputGroup>
                  <InputValidationError error={this.props.errors.name} />
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
    saved: state.categories.saved,
    errors: state.categories.errors,
  };
}

export default withRouter(connect(mapStateToProps)(CategoryAdd));
