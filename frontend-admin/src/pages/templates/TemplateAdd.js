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
  Progress,
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Widget from '../../components/Widget/Widget';
import {
  InputValidationError,
  SectionHeader,
} from '../../helpers/components/common-ui';
import mainLogo from '../../assets/testlogo.png';

import {
  getList,
  setAxis,
  setAxisCall,
  updateTemplate,
  downloadTemplate,
  loadEditTemplate,
  formChange,
  setLogo,
} from '../../actions/template';

import { getList as getCategoryList } from '../../actions/category';
import { saveForm, updateForm } from '../../actions/template';

import { getFonts } from '../../actions/fonts';

import { makeStyles } from '@material-ui/core/styles';

import AutocompleteUi from '../../helpers/components/AutoComplete';
import { Icon } from '@material-ui/core';
import Draggable from 'react-draggable';

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
      label_color: 'black',
    };
    this.inputRef = React.createRef();
    this.logoRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch(getCategoryList());
    this.props.dispatch(getFonts());
    if (this.props && this.props.match.params.id) {
      this.props.dispatch(
        getList({ searchQuery: { _id: this.props.match.params.id } }, true)
      );
    }
    console.log(this.props.location.state, '....this.props.location.state');
    if (this.props.location.state && this.props.location.state.url) {
      this.setState({
        addPopup: true,
        url: this.props.location.state.url,
        id: this.props.location.state.id,
      });
      console.log('call____________________________________');
      this.props.dispatch(loadEditTemplate(this.props.location.state.id));
    }
  }

  changeInput = (event) => {
    this.props.dispatch(formChange({ name: event.target.value }));
  };

  save = (e) => {
    const { name, status, category_id, image, _id } = this.props.formData;
    e.preventDefault();
    const formData = new FormData();
    _id && formData.append('id', _id);
    formData.append('name', name);
    formData.append('status', status);
    formData.append('category_id', category_id);
    formData.append('image', image);
    if (_id) {
      this.props.dispatch(updateForm(formData));
    } else {
      this.props.dispatch(saveForm(formData));
    }
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

    console.log(e.pageX, rect.x, 'X------------');
    console.log(e.pageY, rect.y, 'Y------------');

    const x = e.pageX - rect.x;
    const y = e.pageY - rect.y - 14;
    const labelsArr =
      this.state.imageAxis.length === 0
        ? this.props.axis
        : this.state.imageAxis;
    let labelCount = labelsArr.length === 0 ? 1 : labelsArr.length + 1;
    this.setState(
      {
        imageAxis: [
          ...labelsArr,
          {
            index: labelCount,
            name: `Label ${labelCount}`,
            x,
            y,
          },
        ],
      },
      () => this.props.dispatch(setAxisCall(this.state.imageAxis))
    );
  };

  updateAxis = (axis) => {
    this.props.dispatch(setAxisCall(axis));
    this.setState({
      valueNew: axis,
    });
  };

  templatePopup = (status) => {
    this.setState({
      addPopup: status,
    });
  };

  updateTemplate = (axis, logo) => {
    axis['_id'] = this.state.id;
    //console.log(, '......axis');
    const updateBody = {};
    updateBody['_id'] = this.state.id;
    updateBody.texts = axis;
    updateBody.logo = logo;
    this.props.dispatch(updateTemplate(updateBody));
    //this.setState({ valueNew: axis });
  };

  downloadTemplate = () => {
    this.props.dispatch(downloadTemplate(this.state.id));
  };

  setCategory = (val) => {
    console.log(val, 'selected........OK');
    this.props.dispatch(formChange({ category_id: val._id }));
  };

  setColor = (val) => {
    console.log(val, 'setColor........OK');
    this.setState({ label_color: val.name });
  };

  setPosition = (val) => {
    // console.log(
    //   val,
    //   this.inputRef.current.clientHeight,
    //   'setPosition........OK'
    // );
    console.log('call........', val);
    if (val && val.slug !== 'none') {
      const logoAxis = this.getLogoAxis(val.slug);
      //console.log(logoAxis, '.......logoAxis');
      this.props.dispatch(setLogo([{ ...val, ...logoAxis }]));
    } else {
      this.props.dispatch(setLogo([{ name: 'NO LOGO', slug: 'none' }]));
    }

    // this.setState({ label_color: val.name });
    //this.inputRef.current.clientHeight
  };

  getLogoAxis = (slug) => {
    const { clientHeight, clientWidth } = this.inputRef.current;
    const logoHeight = this.logoRef.current.clientHeight;
    const logoWidth = this.logoRef.current.clientWidth;
    console.log(clientHeight, clientWidth, '.....clientHeight, clientWidth');
    console.log(logoHeight, logoWidth, '.....logoWidth, logoWidth');
    let axis = { x: 0, y: 0 };
    switch (slug) {
      case 'right':
        return { x: clientWidth - logoWidth, y: 0 };
      case 'right-bottom':
        return { x: clientWidth - logoWidth, y: clientHeight - logoHeight };
      case 'left-bottom':
        return { x: 0, y: clientHeight - logoHeight };
      case 'top-center':
        return { x: clientWidth / 2 - logoWidth / 2, y: 0 };
      case 'bottom-center':
        return {
          x: clientWidth / 2 - logoWidth / 2,
          y: clientHeight - logoHeight,
        };
      case 'center-left':
        return {
          x: 0,
          y: clientHeight / 2 - logoHeight / 2,
        };
      case 'center-right':
        return {
          x: clientWidth - logoWidth,
          y: clientHeight / 2 - logoHeight / 2,
        };
      case 'center':
        return {
          x: clientWidth / 2 - logoWidth / 2,
          y: clientHeight / 2 - logoHeight / 2,
        };
      default:
        return axis;
    }
  };

  changeCheck = (e) => {
    //this.setState({ status: e.target.checked });
    this.props.dispatch(formChange({ status: e.target.checked }));
  };

  onFileChange = (event) => {
    console.log(event.target.files, '...event.target.files');
    //this.setState({ fnt: event.target.files[0] });
    this.props.dispatch(formChange({ image: event.target.files[0] }));
    //this.setState({ fonts: [...this.state.fonts, event.target.files[0]] });
  };

  getFontObjById = (id) => {
    console.log(id, '.......getFontObjById', this.props.categoryList);
    return this.props.categoryList.find((val) => val._id === id);
  };
  render() {
    console.log(this.props.logo, '.........this.props.logothis.props.logo');
    const colorArr = [
      { name: 'Black' },
      { name: 'White' },
      { name: 'Red' },
      { name: 'Orange' },
      { name: 'Yellow' },
      { name: 'Green' },
    ];
    const positionArr = [
      { name: 'NO LOGO', slug: 'none' },
      { name: 'TOP LEFT', slug: 'left' },
      { name: 'TOP RIGHT', slug: 'right' },
      { name: 'TOP CENTER', slug: 'top-center' },
      { name: 'BOTTOM LEFT', slug: 'left-bottom' },
      { name: 'BOTTOM RIGHT', slug: 'right-bottom' },
      { name: 'BOTTOM CENTER', slug: 'bottom-center' },
      { name: 'CENTER', slug: 'center' },
      { name: 'CENTER LEFT', slug: 'center-left' },
      { name: 'CENTER RIGHT', slug: 'center-right' },
    ];
    const {
      axis = [],
      downloadUrl = false,
      setAxisSaved = false,
      logo = [],
    } = this.props;
    console.log(logo, 'fonts Template parent is calling..........');
    if (this.props.saved) {
      return <Redirect to='/admin/template' />;
    }
    if (downloadUrl !== '') {
      window.open(downloadUrl);
    }
    return (
      <div>
        <Row>
          <Col>
            <Widget>
              <SectionHeader
                headName='Add New Template  '
                headButtonName='Template List'
                headButtonUrl='/admin/template'
                props={this.props}
              />
              <p className='widget-auth-info'>Please fill all fields below.</p>
              <br />
              <AutocompleteUi
                label='Select Category'
                data={this.props.categoryList}
                labelKey='name'
                callBack={(selected) => this.setCategory(selected)}
                selected={this.getFontObjById(this.props.formData.category_id)}
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
                  <Label for='name'> Template Name </Label>
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
                      onChange={this.onFileChange}
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
                    style={{
                      color: '#fff',
                    }}
                  >
                    {this.props.isFetching ? 'Loading...' : 'Create'}
                  </Button>
                </div>
              </form>
              <Modal size='lg' isOpen={this.state.addPopup}>
                <ModalHeader
                  style={{ width: '100%' }}
                  toggle={() => this.props.history.push('/admin/template')}
                >
                  <div
                    style={{ width: '100%', display: 'flex', height: '50px' }}
                  >
                    {/* {setAxisSaved ? (
                      <span>
                        Setting Your Template...
                        <Icon
                          className='fa fa-spinner fa-spin'
                          style={{
                            color: 'white',
                            float: 'center',
                          }}
                        />
                      </span>
                    ) : (
                      <span>Create You Template</span>
                    )} */}

                    <div
                      style={{
                        float: 'right',
                        paddingRight: '20px',
                        width: '200px',
                        position: 'absolute',
                      }}
                    >
                      <AutocompleteUi
                        label='Select Label color'
                        data={colorArr}
                        labelKey='name'
                        callBack={(selected) => this.setColor(selected)}
                        selected={colorArr[0]}
                      />
                    </div>

                    <div
                      style={{
                        float: 'right',
                        paddingRight: '20px',
                        width: '200px',
                        position: 'absolute',
                        marginLeft: '13%',
                      }}
                    >
                      <AutocompleteUi
                        label='Select Logo Position'
                        data={positionArr}
                        labelKey='name'
                        callBack={(selected) => this.setPosition(selected)}
                        selected={positionArr[0]}
                      />
                    </div>

                    <div
                      style={{
                        float: 'right',
                        //paddingRight: '20px',
                        //width: '200px',
                        position: 'absolute',
                        marginLeft: '80%',
                      }}
                    >
                      {setAxisSaved ? (
                        <span>
                          Setting Your Template...
                          <Icon
                            className='fa fa-spinner fa-spin'
                            style={{
                              color: 'white',
                            }}
                          />
                        </span>
                      ) : (
                        <span>
                          <Button
                            color='primary'
                            onClick={() => this.downloadTemplate()}
                          >
                            Download Template
                          </Button>
                          {'  '}
                          <Button
                            color='success'
                            onClick={() => this.updateTemplate(axis, logo)}
                          >
                            Save changes
                          </Button>
                          {'  '}
                          <Button
                            color='danger'
                            onClick={() =>
                              this.props.history.push('/admin/template')
                            }
                          >
                            Close
                          </Button>
                        </span>
                      )}
                    </div>
                  </div>
                </ModalHeader>
                <ModalBody
                  className='bg-white2'
                  style={{
                    backgroundColor: '#12142B',
                    padding: '0px',
                    height: '100vh',
                  }}
                >
                  <div>
                    <img
                      id='myimg'
                      alt=''
                      src={this.state.url}
                      onClick={this.imageClick}
                      ref={this.inputRef}
                      style={{
                        cursor: 'text',
                        float: 'left',
                      }}
                    />
                    <div id='imageDiv'>
                      <img
                        id='logo'
                        alt=''
                        src={mainLogo}
                        ref={this.logoRef}
                        style={{
                          display:
                            this.props.logo[0].slug === 'none'
                              ? 'none'
                              : 'inline-block',
                          position: 'absolute',
                          top: `${this.props.logo[0].y}px`,
                          left: `${this.props.logo[0].x}px`,
                        }}
                      />

                      {axis.map((data) => {
                        return (
                          <div
                            key={`imageLabel${data.index}`}
                            style={{
                              fontWeight: 'bold',
                              backgroundColor: 'none',
                              color: this.state.label_color,
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
                    <div>
                      <Draggable>
                        <div
                          style={{
                            width: '300px',
                            height: '100vh',
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
                  </div>
                </ModalBody>
                {/* <ModalFooter> */}
                {/* {setAxisSaved ? (
                    <span>
                      Setting Your Template...
                      <Icon
                        className='fa fa-spinner fa-spin'
                        style={{
                          color: 'white',
                        }}
                      />
                    </span>
                  ) : (
                    <span>
                      <Button
                        color='danger'
                        onClick={() =>
                          this.props.history.push('/admin/template')
                        }
                      >
                        Close
                      </Button>
                      {'  '}
                      <Button
                        color='primary'
                        onClick={() => this.downloadTemplate()}
                      >
                        Download Template
                      </Button>
                      {'  '}
                      <Button
                        color='primary'
                        onClick={() => this.updateTemplate(axis, logo)}
                      >
                        Save changes
                      </Button>
                    </span>
                  )} */}
                {/* </ModalFooter> */}
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
    logo: state.template.logo,
    categoryList: state.categories.list,
    formData: state.template.formData,
    fontList: state.fonts.list,
    downloadUrl: state.template.downloadUrl,
    setAxisSaved: state.template.setAxis,
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
  const { axis = [], fontList = [] } = props;

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
    return fontList.find((font) => font._id === id);
  };

  return axis.length === 0 ? (
    <>
      <h1>Please click on image and select your AXIS</h1>
      <h5>For additional info please contact admin</h5>
    </>
  ) : (
    axis.map((data) => {
      return (
        <div
          style={{
            borderBottom: '3px solid #12152e',
          }}
        >
          <FormGroup className='mt'>
            <Label
              for='name'
              style={{
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Manage {data.name}
              Details
            </Label>
            <Icon
              className='fa fa-trash'
              style={{
                color: '#EC0607',
                float: 'right',
                marginTop: '1px',
              }}
              onClick={() => deleteAxis(data.index)}
            />
            <AutocompleteUi
              label='Select Font'
              data={props.fontList}
              labelKey='name'
              callBack={(selected) => setFonts(selected, data.index, 'font')}
              selected={getFontObjById(data.font)}
            />
            <InputGroup
              className='input-group-no-border'
              style={{
                paddingTop: '5px',
              }}
            >
              <Input
                id={`label${data.index}`}
                className='input-transparent pl-3'
                onChange={(e) => changeInput(e, data.index, 'label')}
                value={data.label}
                type='text'
                name={`label${data.index}`}
                placeholder='Name'
              />
            </InputGroup>
            <InputGroup
              className='input-group-no-border'
              style={{
                paddingTop: '5px',
              }}
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
              style={{
                paddingTop: '5px',
              }}
            >
              <span
                style={{
                  fontWeight: 'bold',
                  marginTop: '9px',
                  marginRight: '10px',
                }}
              >
                X - AXIS
              </span>
              <Input
                id={`label${data.index}`}
                className='input-transparent pl-3'
                onChange={(e) => changeInput(e, data.index, `x`)}
                value={data.x}
                type='number'
                name={`label${data.index}x`}
              />
              <Icon
                className='fa fa-arrow-circle-left'
                style={{
                  color: 'white',
                  marginTop: '9px',
                }}
                onClick={() => updateAxis('x', -1, data.index)}
              />
              <Icon
                className='fa fa-arrow-circle-right'
                style={{
                  color: 'white',
                  marginTop: '9px',
                }}
                onClick={() => updateAxis('x', 1, data.index)}
              />
            </InputGroup>
            <InputGroup
              className='input-group-no-border'
              style={{
                paddingTop: '5px',
              }}
            >
              <span
                style={{
                  fontWeight: 'bold',
                  marginTop: '9px',
                  marginRight: '10px',
                }}
              >
                Y - AXIS
              </span>
              <Input
                id={`label${data.index}`}
                className='input-transparent pl-3'
                onChange={(e) => changeInput(e, data.index, `y`)}
                value={data.y}
                type='number'
                name={`label${data.index}y`}
              />
              <Icon
                className='fa fa-arrow-circle-down'
                style={{
                  color: 'white',
                  marginTop: '9px',
                }}
                onClick={() => updateAxis('y', 1, data.index)}
              />
              <Icon
                className='fa fa-arrow-circle-up'
                style={{
                  color: 'white',
                  marginTop: '9px',
                }}
                onClick={() => updateAxis('y', -1, data.index)}
              />
            </InputGroup>
            {/* <InputValidationError error={this.props.errors.name} /> */}
          </FormGroup>
        </div>
      );
    })
  );
};

// function mapStateToPropsF(state) {
//   return {
//     axis: state.template.axis,
//   };
// }

// withRouter(connect(mapStateToPropsF)(SaveTemplateForm));
