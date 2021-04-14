import React, { useRef } from 'react';
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import Widget from '../../components/Widget/Widget';
import {
  InputValidationError,
  SectionHeader,
} from '../../helpers/components/common-ui';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  getList,
  setAxis,
  setAxisCall,
  updateTemplate,
  downloadTemplate,
  loadEditTemplate,
} from '../../actions/template';

import { getList as getCategoryList } from '../../actions/category';

import { getFonts } from '../../actions/fonts';

import { makeStyles } from '@material-ui/core/styles';

import AutocompleteUi from '../../helpers/components/AutoComplete';
import { Icon } from '@material-ui/core';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

//const inputRef = useRef();

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
      // Default transform is "translate(14px, 20px) scale(1)""
      // This lines up the label with the initial cursor position in the input
      // after changing its padding-left.
      transform: 'translate(34px, 20px) scale(1);',
    },
  },
  inputRoot: {
    color: 'purple',
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'green',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'purple',
    },
  },
}));

// import './index.module.scss';

class TemplateAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fnt: {},
      png: {},
      fonts: [],
      imageAxis: [],
      valueNew: 1,
      addPopup: false,
      url: '',
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch(getCategoryList());
    this.props.dispatch(getFonts());
    if (this.props && this.props.match.params.id) {
      this.props.dispatch(getCategoryList());
    }
    //console.log(this.props.location.state, '....this.props.location.state');
    if (this.props.location.state && this.props.location.state.url) {
      this.setState({
        addPopup: true,
        url: this.props.location.state.url,
        id: this.props.location.state.id,
      });
      //console.log('call____________________________________');
      this.props.dispatch(loadEditTemplate(this.props.location.state.id));
    }
  }

  changeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  save = (e) => {
    e.preventDefault();
    // this.props.dispatch(saveForm({ name: this.state.name }));
  };

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate call');
    // if (prevProps.axis !== this.props.axis) {
    //   this.setState({ valueNew: ++this.state.valueNew });
    // }
  }

  imageClick = (e) => {
    const { offsetTop, offsetLeft } = this.inputRef.current;
    let elem = document.querySelector('#myimg');
    let rect = elem.getBoundingClientRect();
    const x = e.pageX - rect.x + 10;
    const y = e.pageY - rect.y + 2;
    const labelsArr =
      this.state.imageAxis.length === 0
        ? this.props.axis
        : this.state.imageAxis;
    let labelCount = labelsArr.length === 0 ? 1 : labelsArr.length + 1;
    this.setState(
      {
        imageAxis: [
          ...labelsArr,
          { index: labelCount, name: `Label ${labelCount}`, x, y },
        ],
      },
      () => this.props.dispatch(setAxisCall(this.state.imageAxis))
    );
  };

  updateAxis = (axis) => {
    this.props.dispatch(setAxisCall(axis));
    this.setState({ valueNew: axis });
  };

  templatePopup = (status) => {
    this.setState({ addPopup: status });
  };

  updateTemplate = (axis) => {
    axis['_id'] = this.state.id;
    //console.log(axis, '......axis');
    const updateBody = {};
    updateBody['_id'] = this.state.id;
    updateBody.texts = axis;
    this.props.dispatch(updateTemplate(updateBody));
    //this.setState({ valueNew: axis });
  };

  downloadTemplate = () => {
    this.props.dispatch(downloadTemplate(this.state.id));
  };

  setCategory = (val) => {
    //console.log(val, 'selected........OK');
  };

  render() {
    const { axis = [] } = this.props;
    console.log(this.props.axis, 'Template parent is calling..........');
    if (this.props.saved) {
      return <Redirect to='/admin/categories' />;
    }
    return (
      <div>
        <Row>
          <Col>
            <Widget>
              <SectionHeader
                headName='Add New Template  '
                headButtonName='Category List'
                headButtonUrl='/admin/categories'
                props={this.props}
              />
              <p className='widget-auth-info'>Please fill all fields below.</p>
              <br />
              <AutocompleteUi
                label='Select Category'
                data={this.props.categoryList}
                labelKey='name'
                callBack={(selected) => this.setCategory(selected)}
              />

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
                      placeholder='Template Name'
                    />
                  </InputGroup>
                  <InputValidationError error={this.props.errors.name} />
                </FormGroup>

                <br />

                <FormGroup className='mt'>
                  <Label for='name'>Select Template Image</Label>
                  <InputGroup className='input-group-no-border'>
                    <Input
                      id='name'
                      className='input-transparent pl-3'
                      // value={this.state.name}
                      type='file'
                      name='name'
                      placeholder='Name'
                      //onChange={this.onFileChange}
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

              <Modal size='lg' isOpen={this.state.addPopup}>
                <ModalHeader toggle={true}>Modal title</ModalHeader>
                <ModalBody
                  className='bg-white2'
                  style={{ backgroundColor: '#12142B' }}
                >
                  <div>
                    <img
                      id='myimg'
                      alt=''
                      src={this.state.url}
                      onClick={this.imageClick}
                      ref={this.inputRef}
                      style={{ cursor: 'text', float: 'left' }}
                    />
                    <div>
                      <Draggable>
                        <div
                          style={{
                            width: '300px',
                            height: '700px',
                            overflow: 'scroll',
                            position: 'absolute',
                            backgroundColor: '#1b1e3c',
                            left: '83%',
                            padding: '10px',
                          }}
                        >
                          <SaveTemplateForm
                            props={this.props}
                            updateAxisRedux={this.updateAxis}
                            updateTemplate={this.updateTemplate}
                          />
                          {/* </div> */}
                        </div>
                      </Draggable>
                    </div>
                    <div id='imageDiv'>
                      {axis.map((data) => {
                        console.log(
                          data,
                          '......Image label calling__________________'
                        );
                        return (
                          <div
                            key={`imageLabel${data.index}`}
                            style={{
                              fontWeight: 'bold',
                              backgroundColor: 'none',
                              color: 'black',
                              fontSize: '16px',
                              position: 'absolute',
                              top: `${data.y}px`,
                              left: `${data.x}px`,
                            }}
                          >
                            {data.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color='secondary'
                    onClick={() => this.props.history.push('/admin/template')}
                  >
                    Close
                  </Button>
                  <Button
                    color='primary'
                    onClick={() => this.downloadTemplate()}
                  >
                    Download Template
                  </Button>
                  <Button
                    color='primary'
                    onClick={() => this.updateTemplate(axis)}
                  >
                    Save changes
                  </Button>
                </ModalFooter>
              </Modal>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}
// const ImageAxisHelper = () => {
//   const inputRef = useRef();
//   const { offsetTop, offsetLeft } = inputRef.current;
//   const imageClick = (e) => {
//     console.log('Click');
//     //var offset = $(this).offset();
//     const x = e.pageX - offsetLeft;
//     const y = e.pageY - offsetTop;
//     console.log({ x, y }, '....olpp');
//   };
//   return (
//     <img src={'images/img.jpeg'} onClick={() => imageClick()} ref={inputRef} />
//   );
// };

function mapStateToProps(state) {
  return {
    saved: state.categories.saved,
    errors: state.categories.errors,
    axis: state.template.axis,
    categoryList: state.categories.list,
    fontList: state.fonts.list,
  };
}

export default withRouter(connect(mapStateToProps)(TemplateAdd));

// class ImageAxisHelper extends React.Component {

//   const inputRef = useRef();
//   const { offsetTop, offsetLeft } = inputRef.current;
//   const imageClick = (e) => {
//     console.log('Click');
//     //var offset = $(this).offset();
//     const x = e.pageX - offsetLeft;
//     const y = e.pageY - offsetTop;
//     console.log({ x, y }, '....olpp');
//   };
//   render(){
//     return (
//       <img src={'images/img.jpeg'} onClick={() => imageClick()} ref={inputRef} />
//     );
//   }

// }

const SaveTemplateForm = ({ props, updateAxisRedux }) => {
  const { axis = [] } = props;

  console.log(axis, '......child is call');
  const updateAxis = (axi, margin, index) => {
    const finalIndex = index - 1;
    console.log('updateAxis call........', finalIndex, axis);
    if (axis[finalIndex]) {
      const updateAxis = axis[finalIndex];
      console.log(updateAxis, 'befor.....');
      updateAxis[axi] = parseInt(updateAxis[axi]) + margin;
      console.log(updateAxis, 'after.....');
      axis[index - 1] = updateAxis;
    }
    console.log('call........');
    updateAxisRedux(axis);
    //props.dispatch(setAxisCall(axis));
  };

  const deleteAxis = (index) => {
    axis.splice(index - 1, 1);
    const newAxis = axis.map((val, index) => ({
      ...val,
      index: index + 1,
      name: `Label ${index + 1}`,
    }));
    console.log(axis, 'deleted.....');
    updateAxisRedux(newAxis);
  };

  const changeInput = (e, index, keyName) => {
    //console.log('changeInput call......');
    const finalIndex = index - 1;
    if (axis[finalIndex]) {
      const updateAxis = axis[finalIndex];
      updateAxis[keyName] =
        ['x', 'y'].indexOf(keyName) === -1
          ? e.target.value
          : parseInt(e.target.value);
      axis[index - 1] = updateAxis;
    }
    //console.log('call........rr', axis);
    updateAxisRedux(axis);
  };

  const setFonts = (selected, index, keyName) => {
    //console.log(selected, 'selected Fonts,.......');
    const finalIndex = index - 1;
    if (axis[finalIndex]) {
      const updateAxis = axis[finalIndex];
      updateAxis[keyName] = selected._id;
      axis[index - 1] = updateAxis;
    }
    //console.log('call........rr', axis);
    updateAxisRedux(axis);
  };

  const getFontObjById = (id) => {
    return props.fontList.find((font) => font._id === id);
  };

  return axis.map((data) => {
    return (
      <div style={{ borderBottom: '1px dashed white' }}>
        <FormGroup className='mt'>
          <Label
            for='name'
            style={{
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Manage {data.name} Details
          </Label>
          <Icon
            className='fa fa-trash'
            style={{ color: '#EC0607', float: 'right', marginTop: '1px' }}
            onClick={() => deleteAxis(data.index)}
          />
          <AutocompleteUi
            label='Select Fonts'
            data={props.fontList}
            labelKey='name'
            callBack={(selected) => setFonts(selected, data.index, 'font')}
            selected={getFontObjById(data.font)}
          />
          <InputGroup
            className='input-group-no-border'
            style={{ paddingTop: '5px' }}
          >
            <Input
              id={`label${data.index}`}
              className='input-transparent pl-3'
              onChange={(e) => changeInput(e, data.index, 'label')}
              value={data.label}
              type='text'
              name={`label${data.index}`}
              placeholder={data.name}
            />
          </InputGroup>
          <InputGroup
            className='input-group-no-border'
            style={{ paddingTop: '5px' }}
          >
            <Input
              id={`label${data.index}`}
              className='input-transparent pl-3'
              onChange={(e) => changeInput(e, data.index, 'text')}
              value={data.text}
              type='text'
              name={`label${data.index}`}
              placeholder='Sample Text'
            />
          </InputGroup>

          <InputGroup
            className='input-group-no-border'
            style={{ paddingTop: '5px' }}
          >
            <span style={{ fontWeight: 'bold', marginTop: '9px' }}>X-AXIS</span>
            <Input
              id={`label${data.index}`}
              className='input-transparent pl-3'
              onChange={(e) => changeInput(e, data.index, `x`)}
              value={data.x}
              type='text'
              name={`label${data.index}x`}
            />
            <Icon
              className='fa fa-arrow-circle-left'
              style={{ color: 'white' }}
              onClick={() => updateAxis('x', -1, data.index)}
            />
            <Icon
              className='fa fa-arrow-circle-right'
              style={{ color: 'white' }}
              onClick={() => updateAxis('x', 1, data.index)}
            />
          </InputGroup>
          <InputGroup
            className='input-group-no-border'
            style={{ paddingTop: '5px' }}
          >
            <span style={{ fontWeight: 'bold', marginTop: '9px' }}>Y-AXIS</span>
            <Input
              id={`label${data.index}`}
              className='input-transparent pl-3'
              onChange={(e) => changeInput(e, data.index, `y`)}
              value={data.y}
              type='text'
              name={`label${data.index}y`}
            />
            <Icon
              className='fa fa-arrow-circle-down'
              style={{ color: 'white' }}
              onClick={() => updateAxis('y', 1, data.index)}
            />
            <Icon
              className='fa fa-arrow-circle-up'
              style={{ color: 'white' }}
              onClick={() => updateAxis('y', -1, data.index)}
            />
          </InputGroup>
          {/* <InputValidationError error={this.props.errors.name} /> */}
        </FormGroup>
      </div>
    );
  });
};

// function mapStateToPropsF(state) {
//   return {
//     axis: state.template.axis,
//   };
// }

// withRouter(connect(mapStateToPropsF)(SaveTemplateForm));
