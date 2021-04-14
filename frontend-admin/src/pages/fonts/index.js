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
import { getFonts } from '../../actions/fonts';
import { connect } from 'react-redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import Widget from '../../components/Widget/Widget';
import { SectionHeader } from '../../helpers/components/common-ui';

// import './index.module.scss';

class Fonts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableStyles: [],
      checkboxes1: [false, true, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
    };

    this.checkAll = this.checkAll.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getFonts());
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
    return (
      <div>
        <Row>
          <Col>
            <Widget>
              <SectionHeader
                headName='Font List'
                headButtonName='+ Add Font'
                headButtonUrl='/admin/fonts/add'
                props={this.props}
              />
              <Table striped>
                <thead>
                  <tr className='fs-sm'>
                    <th className='hidden-sm-down'>#</th>
                    <th>Name</th>
                    <th>Dates</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.fonts.list.map((row) => (
                    <tr key={row['_id']}>
                      <td>{row['_id']}</td>
                      <td>{row.name}</td>
                      <td>
                        {row.createdAt}
                        {row.UpdatedAt}
                      </td>
                      <td>{row.idDeleted}</td>
                      <td></td>
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
    fonts: state.fonts,
  };
}

export default withRouter(connect(mapStateToProps)(Fonts));
