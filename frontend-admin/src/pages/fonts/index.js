import React from 'react';
import { Row, Col, Table, Badge, Input } from 'reactstrap';
import { getFonts } from '../../actions/fonts';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Widget from '../../components/Widget/Widget';
import { SectionHeader } from '../../helpers/components/common-ui';
import { StatusBadge, ShowDates } from '../../helpers/components/common-ui';

class Fonts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: {} };
  }

  componentDidMount() {
    this.props.dispatch(getFonts({ sort: { _id: -1 } }));
  }

  checkAll(ev, checkbox) {
    const checkboxArr = new Array(this.state[checkbox].length).fill(
      ev.target.checked
    );
    this.setState({
      [checkbox]: checkboxArr,
    });
  }

  goEdit = (id) => {
    console.log(id, '...');
    this.props.history.push({
      pathname: `/admin/fonts/edit/${id}`,
      state: {
        id,
      },
    });
  };

  search = (e) => {
    console.log('call,,,', e.target.value.length);
    if (e.target.value.length > 3) {
      this.setState(
        {
          search: { ...this.state.search, [e.target.name]: e.target.value },
        },
        () =>
          this.props.dispatch(
            getFonts({ sort: { _id: -1 }, searchQuery: this.state.search })
          )
      );
      //this.props.dispatch(getFonts({ sort: { _id: -1 } }));
    }
  };

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
                    <th className='hidden-sm-down'># Id</th>
                    <th>Name</th>
                    <th>Add/Update Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <thead>
                  <tr className='fs-sm'>
                    <th>
                      <Input
                        id='_id'
                        className='input-transparent pl-3'
                        value={this.state.search.id}
                        onChange={this.search}
                        type='text'
                        name='_id'
                        placeholder='Search by Id'
                      />
                    </th>
                    <th>
                      <Input
                        id='name'
                        className='input-transparent pl-3'
                        value={this.state.search.name}
                        onChange={this.search}
                        type='text'
                        name='name'
                        placeholder='Search by Name'
                      />
                    </th>
                    <th></th>
                    <th>
                      <Input
                        id='name'
                        className='input-transparent pl-3'
                        //value={this.props.formData.name}
                        //onChange={this.changeName}
                        type='text'
                        name='name'
                        placeholder='Search by Status'
                      />
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.fonts.list.map((row) => (
                    <tr key={row['_id']}>
                      <td>{row['_id']}</td>
                      <td>{row.name}</td>
                      <td>
                        <ShowDates
                          createdAt={row.createdAt}
                          updatedAt={row.updatedAt}
                        />
                      </td>
                      <td>
                        <StatusBadge status={row.status} />
                      </td>
                      <td>
                        <a
                          href='javascript:void(0);'
                          onClick={() => this.goEdit(row._id)}
                        >
                          <Badge color='primary' className='mr-xs'>
                            Edit
                          </Badge>
                        </a>
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
    fonts: state.fonts,
  };
}

export default withRouter(connect(mapStateToProps)(Fonts));
