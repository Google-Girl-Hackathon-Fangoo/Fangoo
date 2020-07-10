import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './MyList.css';
import { List, Typography, Divider } from 'antd';


export default class MyList extends Component{
      constructor(props){
        super(props);
        this.data=props.data;
      }
      setdata
        render(){
            return(
            <Divider orientation="left">Default Size</Divider>,
            <List
            //header={<div>具体安排</div>}
            bordered
            dataSource={this.data}
            renderItem={item => (
                <List.Item>
                <Typography.Text mark></Typography.Text> {item}
                </List.Item>
            )}/>
            )
            }
      };