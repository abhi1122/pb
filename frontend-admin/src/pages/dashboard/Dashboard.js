import React from 'react';
import {
  Row,
  Col,
  Progress,
  Table,
  Label,
  Input,
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import { Icon } from '@material-ui/core';

import Widget from '../../components/Widget';

import Calendar from './components/calendar/Calendar';
import Map from './components/am4chartMap/am4chartMap';
import Rickshaw from './components/rickshaw/Rickshaw';

import AnimateNumber from 'react-animated-number';

import s from './Dashboard.module.scss';

import peopleA1 from '../../assets/people/a1.jpg';
import peopleA2 from '../../assets/people/a2.jpg';
import peopleA5 from '../../assets/people/a5.jpg';
import peopleA4 from '../../assets/people/a4.jpg';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
    };
    this.checkTable = this.checkTable.bind(this);
  }

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    const blocks = [
      {
        icon: 'thumbs-o-up',
        color: '#2477ff',
        name: 'Total Users',
        number: '10,000',
      },
      {
        icon: 'magic',
        color: '#db2a34',
        name: 'Total Category',
        number: '200',
      },
      { icon: 'user-o', color: 'grey', name: 'Total Template', number: '500' },
      {
        icon: 'film',
        color: '#2d8515',
        name: 'Total Downloads',
        number: '8,000',
      },
      {
        icon: 'thumbs-o-up',
        color: '#2477ff',
        name: 'Total Users',
        number: '10,000',
      },
      {
        icon: 'magic',
        color: '#db2a34',
        name: 'Total Category',
        number: '200',
      },
      { icon: 'user-o', color: 'grey', name: 'Total Template', number: '500' },
      {
        icon: 'film',
        color: '#2d8515',
        name: 'Total Downloads',
        number: '8,000',
      },
      {
        icon: 'film',
        color: '#2d8515',
        name: 'Total Downloads',
        number: '8,000',
      },
      {
        icon: 'thumbs-o-up',
        color: '#2477ff',
        name: 'Total Users',
        number: '10,000',
      },
      {
        icon: 'magic',
        color: '#db2a34',
        name: 'Total Category',
        number: '200',
      },
      { icon: 'user-o', color: 'grey', name: 'Total Template', number: '500' },
      {
        icon: 'film',
        color: '#2d8515',
        name: 'Total Downloads',
        number: '8,000',
      },
    ];
    return (
      <div>
        {blocks.map((val, index) => (
          <Card
            className='border-0'
            style={{
              width: '20%',
              display: 'inline-block',
              marginRight: '30px',
              marginLeft: '20px',
              height: '130px',
              marginTop: '50px',
            }}
          >
            <CardBody style={{ display: 'flex' }}>
              {/* <div
                  style={{
                    width: '30%',
                    display: 'inline-block',
                    marginLeft: '10px',
                    // backgroundColor: 'red',
                    height: '60px',
                  }}
                > */}

              <Icon
                className={`fa fa-${val.icon}`}
                style={{
                  opacity: '.8',
                  fontSize: '46px',
                  height: '70px',
                  width: '80px',
                  color: val.color,
                  lineHeight: '50px',
                  //display: 'inline-block',
                }}
              />

              <div>
                <h5>{val.name}</h5>
                <h3>{val.number}</h3>
              </div>
              {/* </div> */}
              {/* <div
                  style={{
                    width: '50%',
                    display: 'inline-block',
                    marginLeft: '10px',
                    //  backgroundColor: 'white',
                    height: '60px',
                  }}
                ></div> */}
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }
}

export default Dashboard;
