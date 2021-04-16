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
    this.state = {
      name: '',
      fnt: {},
      png: {},
      fonts: [],
      parentName: '',
      parentId: null,
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
    this.props.dispatch(
      saveForm({ name: this.state.name, parentId: this.state.parentId })
    );
  };

  render() {
    const { parentId, parentName } = this.state;
    if (this.props.saved) {
      //return <Redirect to='/admin/categories' />;
      this.props.history.push({
        pathname: `/admin/categories/list-child/${parentId}/${parentName}`,
        state: {
          parentId: parentId,
          parentName: parentName,
        },
      });
    }

    console.log(
      this.props.categories,
      '...this.props.categoriescategoriescategories'
    );
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
                headName={`Add New Sub Category for ${this.state.parentName}`}
                headButtonName='Category List'
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
    categories: state.categories,
  };
}

export default withRouter(connect(mapStateToProps)(CategoryAdd));
