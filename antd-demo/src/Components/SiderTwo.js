import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Layout, Menu, Button, Space, Tooltip, Drawer, Select, message } from 'antd';
import { Row, Col, Input, DatePicker, Checkbox } from 'antd';
import { ScheduleOutlined, CarryOutOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'antd/dist/antd.css';
import './SiderTwo.css';
import MyCalendar from './MyCalendar.js';
import MyList from './MyList.js';
import axios from 'axios';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;
var task=[];
var deltask=[];
var schedule=[];
var name="";
function onChange(checkedValues) {
  for (let item of checkedValues) {
    axios.post("/task/update",{
      data: {username:name,title:item}
    }).then((response)=>{
      console.log(response.data)
      if (response.data.msg === 'success'){
        message.success('Update Succed!')
      }else{
        message.warn('Update Failed')
      }
    })
  }
}
function onChangedate(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOkdate(value) {
  console.log('onOk: ', value);
}
class SiderTwo extends Component{
  constructor(props){
    super(props);
    this.user_name="1";
    this.taskoptions=[];
    this.deltask=[];
    this.schedule=[];
    this.state = {
      isLoading : false
    }
  };
  componentWillMount(){
    console.log(this.props);
    this.user_name=this.props.location.query.name;
    name=this.user_name;
    this.taskoptions=this.props.location.query.task;
    this.deltask=this.props.location.query.deltask;
    console.log(this.taskoptions);
    
    this.setState({
      isLoading : true
    })
    this.loadData([{"user_name":this.user_name}])
  }
  loadData = (values) => {
    task=[];
    deltask=[];
    schedule=[];
    console.log(values[0].user_name)
    axios.post("/users/personaltask/queryday",
      {data:{ username: values[0].user_name,date:moment().format('YYYY-MM-DD')}}
    ).then((response)=>{
      for (let item of response.data) {
        task.push(item.taskName);
        deltask.push(<Option value={item.taskName}>{item.taskName}</Option>);
      }
    })
    axios.post("/users/personaltask/querydaily",
      {data:{ username: values[0].user_name,date:moment().format('YYYY-MM-DD')}}
    ).then((response)=>{
      console.log(response)
      for (let item of response.data) {
        schedule.push(item.taskName);
      }
    })
    console.log(task)
    console.log("set false")
    this.setState({
      schedule: schedule,
      taskoptions: task,
      isLoading : false
    })
  }
  state = { visible: false,type: true};
  showDrawer1=() =>{
    this.setState({
      visible: true,
      type: true,
    });
  }
  showDrawer2=() =>{
    this.setState({
      visible: true,
      type: false,
    });
  }
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render(){
    const onFinish = (values) => {
      console.log(values)
      axios.post("/task/arrange",{
        data: {username:this.user_name,title:values.title,date:values.date.format('YYYY-MM-DD HH:mm:ss')}
      }).then((response)=>{
        console.log(response.data)
        if (response.data.msg === 'success'){
          message.success('Create Succed!')
        }else{
          message.warn('Create Failed')
        }
      })
      this.loadData([{"user_name":this.user_name}])
    }
    let {isLoading} = this.state
    console.log("render" + isLoading)
    console.log("render" + isLoading)
    return (
    <Layout>
       <Header className="header">
        <Space size={385}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1"><Link to="/SiderDemo">page 1</Link></Menu.Item>
          <Menu.Item key="2"><Link to={{pathname:'/SiderTwo',query:{name:this.user_name,task:this.task,deltask:this.deltask}}}>page 2</Link></Menu.Item>
        </Menu>
       <Button type="primary">{this.user_name}</Button>
        </Space>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<ScheduleOutlined />} title="Schedule">
            <MyList data={this.state.schedule}/> 
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Space size='middle' direction='vertical'>
            <MyCalendar/>
            <div align='right'>
            <Button type="primary" shape="circle" onClick={this.showDrawer1}>+</Button>
            </div>
          <Drawer
            title="arrange a schedule"
            width={720}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
          >
          <Form layout="vertical" hideRequiredMark  onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                  name="title"
                  label="Title"
                rules={[{ required: true, message: 'Please enter title' }]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
                <Form.Item
                  name="date"
                  label="date"
                  rules={[{ required: true, message: 'Please choose the date' }]}
                >
                <DatePicker showTime onChange={onChangedate} onOk={onOkdate} />
                </Form.Item>
              </Col>
          </Row>
          <Form.Item>
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                    Cancel
                  </Button>
                <Button htmlType='submit' onClick={this.onClose} type="primary" >
                    Submit
                </Button>
          </Form.Item>
          </Form>
        </Drawer>
            </Space>
          </Content>
        <Sider width={150} className="Quick-functions">
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<CarryOutOutlined />} title="Task">
            <Checkbox.Group options={this.state.taskoptions} onChange={onChange} />
            <div align='right'>
            <Tooltip title='Click twice'>
            <Button shape="circle"><Link to={{pathname:'/SiderTwoCopy',query:{name:this.user_name,task:this.taskoptions,deltask:this.deltask}}}>-</Link></Button>
              </Tooltip>
              <Tooltip title='Click twice'>
            <Button type='primary' shape="circle"><Link to={{pathname:'/SiderTwoCopy',query:{name:this.user_name,task:this.taskoptions,deltask:this.deltask}}}>+</Link></Button>
              </Tooltip>
            </div>
            </SubMenu>
          </Menu>
          </Sider>
        </Layout>
      </Layout>
    </Layout>

    
  )}
}
export default SiderTwo;