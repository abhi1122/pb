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
} from 'reactstrap';
import { getList } from '../../actions/template';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import Widget from '../../components/Widget/Widget';
import { SectionHeader } from '../../helpers/components/common-ui';
import { Icon } from '@material-ui/core';
import { CloudImage } from '../../helpers/components/CloudImage';

// import './index.module.scss';

class TemplateList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.checkAll = this.checkAll.bind(this);
  }

  componentDidMount() {
    console.log('did mount call............');
    this.props.dispatch(getList());
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(' ');

    return `${date.toLocaleString('en-us', { month: 'long' })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  checkAll(ev, checkbox) {
    const checkboxArr = new Array(this.state[checkbox].length).fill(
      ev.target.checked
    );
    this.setState({
      [checkbox]: checkboxArr,
    });
  }

  changeCheck(ev, checkbox, id) {
    //eslint-disable-next-line
    this.state[checkbox][id] = ev.target.checked;
    if (!ev.target.checked) {
      //eslint-disable-next-line
      this.state[checkbox][0] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }

  render() {
    console.log(this.props, '.......this.props./././.');
    const { list = [] } = this.props;
    console.log(list, '..................listlistlistlist');
    return (
      <div>
        <Row>
          <Col>
            <Widget>
              <SectionHeader
                headName='Template List'
                headButtonName='+ Add Template'
                headButtonUrl='/admin/template/add'
                props={this.props}
              />
              <Table striped>
                <thead>
                  <tr className='fs-sm'>
                    <th className='hidden-sm-down'> # </th>
                    <th> Image </th>
                    <th> Name </th>
                    <th> Category </th>
                    <th> Status </th>
                    <th> Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {list &&
                    list.map((row) => (
                      <tr key={row['_id']}>
                        <td> {row['_id']} </td>
                        <td>
                          {row.file && (
                            <CloudImage
                              publicId={row.file.public_id}
                              width='100'
                              height='50'
                            />
                          )}
                        </td>
                        <td> {row.name} </td>
                        <td> {row['category_id']} </td>
                        <td> {row.idDeleted} </td>
                        <td>
                          <Icon
                            className='fa fa-eye'
                            style={{
                              color: 'white',
                            }}
                            onClick={() =>
                              this.props.history.push({
                                pathname: '/admin/template/add',
                                state: {
                                  id: row['_id'],
                                  url: row['url'],
                                },
                              })
                            }
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.template.list,
  };
}

export default withRouter(connect(mapStateToProps)(TemplateList));
