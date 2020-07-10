import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './MyCalendar.css';
import { Calendar, Badge,Button } from 'antd';

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'Task1' },
        { type: 'success', content: 'Task3' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'Task2' },
        { type: 'success', content: 'Task10' },
        { type: 'error', content: 'Task6' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'Task4' },
        { type: 'success', content: 'Task7' },
        { type: 'error', content: 'Task13' },
        { type: 'error', content: 'Task8' },
        { type: 'error', content: 'Task12' },
        { type: 'error', content: 'Task5' },
      ];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
    </div>
  ) : null;
}

export default class MyCalendar extends Component{
    render(){
        return (
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        )
    };
};
