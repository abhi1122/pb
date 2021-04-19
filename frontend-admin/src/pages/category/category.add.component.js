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
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Widget from '../../components/Widget/Widget';
import {
  InputValidationError,
  SectionHeader,
} from '../../helpers/components/common-ui';

import { saveForm } from '../../actions/category';

class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fnt: {},
      png: {},
      fonts: [],
      parentName: 'Business',
      parentId: null,
      status: true,
      image: '',
    };
  }

  componentDidMount() {
    if (this.props && this.props.match.params.id) {
      //this.props.dispatch(getList());
    }

    if (this.props.location.state && this.props.location.state.parentId) {
      const { parentId, parentName } = this.props.location.state;
      this.setState({
        parentId,
        parentName,
      });
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  save = (e) => {
    e.preventDefault();
    // this.props.dispatch(
    //   saveForm({ name: this.state.name, parentId: this.state.parentId })
    // );
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('status', this.state.status);
    formData.append('image', this.state.image);
    this.props.dispatch(saveForm(formData));
  };

  changeCheck = (e) => {
    this.setState({ status: e.target.checked });
  };

  onFileChange = (event) => {
    console.log(event.target.files, '...event.target.files');
    this.setState({ image: event.target.files[0] });
  };

  render() {
    console.log(this.props, '.......ADD cAT');
    const { parentId, parentName } = this.state;
    const pageTitle = parentName !== 'Business' ? 'New Sub Category for' : '';
    if (this.props.saved) {
      this.props.history.push({
        pathname: `/admin/categories/list-child/${parentId}/${parentName}`,
        state: {
          parentId: parentId,
          parentName: parentName,
        },
      });
    }

    return (
      <div>
        <Breadcrumb tag='nav' listTag='div'>
          <BreadcrumbItem>Business</BreadcrumbItem>
          {this.props.categories.relations.map((category) => (
            <BreadcrumbItem>
              <a
                href='javascript:void(0)'
                onClick={() =>
                  this.props.history.push({
                    pathname: `/admin/categories/list-child/${category._id}/${category.name}`,
                    state: {
                      parentId: category._id,
                      parentName: category.name,
                    },
                  })
                }
              >
                {category.name}
              </a>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Row>
          <Col>
            <Widget>
              <SectionHeader
                headName={`Add ${pageTitle} ${parentName}`}
                headButtonName={`${parentName} List`}
                headButtonUrl={`/admin/categories/list-child/${parentId}/${this.state.parentName}`}
                props={this.props}
                buttonState={{ parentId, parentName }}
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
                  <Label for='name'>Name</Label>
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
                      placeholder='Name'
                    />
                  </InputGroup>
                  <InputValidationError error={this.props.errors.name} />
                </FormGroup>

                <FormGroup className='mt'>
                  <Label for='name'>Select Image</Label>
                  <InputGroup className='input-group-no-border'>
                    <Input
                      id='name'
                      className='input-transparent pl-3'
                      type='file'
                      name='name'
                      placeholder='Name'
                      onChange={this.onFileChange}
                    />
                  </InputGroup>
                  <InputValidationError error={this.props.errors.image} />
                </FormGroup>

                <FormGroup className='mt'>
                  <div className='abc-checkbox'>
                    <Input
                      id='status'
                      type='checkbox'
                      checked={this.state.status}
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
    saved: state.categories.saved,
    errors: state.categories.errors,
    categories: state.categories,
    core: state.core,
  };
}

export default withRouter(connect(mapStateToProps)(CategoryAdd));
