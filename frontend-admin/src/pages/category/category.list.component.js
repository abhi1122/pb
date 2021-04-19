import React from 'react';
import { Row, Col, Table, Breadcrumb, BreadcrumbItem, Badge } from 'reactstrap';
import { getList } from '../../actions/category';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Widget from '../../components/Widget/Widget';
import { SectionHeader } from '../../helpers/components/common-ui';
import { CloudImage } from '../../helpers/components/CloudImage';
import { StatusBadge, FormatDate } from '../../helpers/components/common-ui';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableStyles: [],
      parentId: null,
      parentName: '',
      parentSlugName: 'Business',
    };

    this.checkAll = this.checkAll.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.parentId) {
      const { parentId, parentName } = this.props.location.state;
      console.log(
        'componentDidMount call....',
        parentId,
        parentName,
        this.state.parentSlugName
      );
      const parentSlugName =
        this.state.parentSlugName === '__blank'
          ? parentName
          : `${this.state.parentSlugName}__--${parentName}`;
      console.log(parentSlugName, '.....parentSlugName');
      this.setState(
        {
          parentId,
          parentName,
          parentSlugName: `${this.state.parentSlugName}__--${parentName}`,
        },
        () => this.props.dispatch(getList({ searchQuery: { parentId } }))
      );
    } else {
      this.props.dispatch(getList({ searchQuery: { parentId: null } }));
    }
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

  changeCategory(parentId, parentName) {
    this.props.history.push({
      pathname: `/admin/categories/list-child/${parentId}/${parentName}`,
      state: {
        parentId,
        parentName,
      },
    });
  }

  render() {
    const { parentId, parentName, parentSlugName } = this.state;
    const pageName = this.state.parentName ? this.state.parentName : 'Business';
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
                headName={`${pageName} List`}
                headButtonName={`+ Add ${pageName}`}
                headButtonUrl={`/admin/categories/add-child/${parentId}/${parentSlugName}`}
                props={this.props}
                buttonState={{ parentId, parentName }}
              />
              <Table striped>
                <thead>
                  <tr className='fs-sm'>
                    <th className='hidden-sm-down'>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Dates</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.categories.list.map((row) => (
                    <tr key={row['_id']}>
                      <td>{row['_id']}</td>
                      <td>
                        {row.file && (
                          <CloudImage
                            publicId={row.file.public_id}
                            width='100'
                            height='50'
                          />
                        )}
                      </td>
                      <td>{row.name}</td>
                      <td>
                        <FormatDate date={row.createdAt} />
                      </td>
                      <td>
                        <StatusBadge status={row.status} />
                      </td>
                      <td>
                        <a href='javascript:void(0)'>
                          <Badge
                            color='success'
                            onClick={() =>
                              this.props.history.push({
                                pathname: `/admin/categories/list-child/${row._id}/${parentSlugName}`,
                                state: {
                                  parentId: row._id,
                                  parentName: row.name,
                                },
                              })
                            }
                          >
                            Manage Sub-Category
                          </Badge>
                        </a>
                        <br />
                        <Badge color='primary'>Edit</Badge>
                        <Badge color='danger'>Active</Badge>
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
    categories: state.categories,
  };
}

export default withRouter(connect(mapStateToProps)(CategoryList));
