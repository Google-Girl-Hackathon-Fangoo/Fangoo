import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './MyCard.css';
import { Card } from 'antd';

export default class MyCard extends Component{
    render(){
        return (
            <Card title="具体安排" extra={<a href="#">More</a>} style={{ width: 800 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        )
    };
};