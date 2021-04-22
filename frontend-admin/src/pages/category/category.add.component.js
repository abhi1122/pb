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

import {
  saveForm,
  getList,
  formChange,
  updateForm,
} from '../../actions/category';

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
    const { pathname } = this.props.location;
    const pathArr = pathname.split('/');
    console.log(pathArr, '...........pathnamepathnamepathnamepathname');
    if (
      this.props &&
      this.props.match.params.id &&
      pathArr.indexOf('edit-child') !== -1
    ) {
      this.props.dispatch(
        getList({ searchQuery: { _id: this.props.match.params.id } }, true)
      );
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
    //this.setState({ [event.target.name]: event.target.value });
    this.props.dispatch(
      formChange({ [event.target.name]: event.target.value })
    );
  };

  save = (e) => {
    const { name, status, _id, image } = this.props.formData;
    const { parentId = null } = this.props.location.state;

    e.preventDefault();
    const formData = new FormData();
    parentId && formData.append('parentId', parentId);
    _id && formData.append('id', _id);
    formData.append('name', name);
    formData.append('status', status);
    formData.append('image', image);
    if (_id) {
      this.props.dispatch(updateForm(formData));
    } else {
      this.props.dispatch(saveForm(formData));
    }
  };

  changeCheck = (e) => {
    //this.setState({ status: e.target.checked });
    this.props.dispatch(formChange({ status: e.target.checked }));
  };

  onFileChange = (event) => {
    //console.log(event.target.files, '...event.target.files');
    //this.setState({ image: event.target.files[0] });
    this.props.dispatch(formChange({ image: event.target.files[0] }));
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
                      value={this.props.formData.name}
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
    saved: state.categories.saved,
    errors: state.categories.errors,
    categories: state.categories,
    core: state.core,
    formData: state.categories.formData,
  };
}

export default withRouter(connect(mapStateToProps)(CategoryAdd));
