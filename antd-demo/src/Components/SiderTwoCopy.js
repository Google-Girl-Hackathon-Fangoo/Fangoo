import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Layout, Menu, Button, Space, Tooltip, Drawer, Select, message } from 'antd';
import {Row,Col,Input,DatePicker,Checkbox} from 'antd';
import { ScheduleOutlined, CarryOutOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './SiderTwoCopy.css';
import SiderDemo from './SiderDemo.js';
import MyCalendar from './MyCalendar.js';
import MyCard from './MyCard.js';
import MyList from './MyList.js';
import MyForm1 from './MyForm1.js';
import MyForm2 from './MyForm2.js';
import axios from 'axios';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;
const data1 = [
  'to-do 1',
  'to-do 2',
];
const data2 = [
  '今日?/总日程1',
  '今日?/总日程2',
];
function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
class ChooseForm extends Component{
  constructor(props){
    super(props);
    this.type=props.type;
  }
  render(){
    if (this.type){
      return <MyForm1/>
    }
    else {
      return <MyForm2/>
    }
  }
  
}
class SiderTwoCopy extends Component{
  state = { visible: false,type: true};
  showDrawer=() =>{
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
      axios.post("/users/task",{
        data: values
      }).then((response)=>{
        console.log(response.data)
        if (response.data.msg === 'success'){
          message.success('Create Succed!')
        }else{
          message.warn('Create Failed')
        }
      })
    }
    return (
    <Layout>
       <Header className="header">
        <Space size={330}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1"><Link to="/SiderDemo">page 1</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/SiderTwo">page 2</Link></Menu.Item>
          <Menu.Item key="3">page 3</Menu.Item>
          <Menu.Item key="4">page 4</Menu.Item>
        </Menu>
       <Button type="primary">用户</Button>
        </Space>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<ScheduleOutlined />} title="Schedule">
            <MyList data={data2}/> 
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          {/*
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          */}
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
            <Tooltip title='Click twice'>
            <Button type="primary" shape="circle"><Link to='/SiderTwo'>+</Link></Button>
            </Tooltip>
            </div>
            <Drawer
            title="Create a new task"
            width={720}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
            /*
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={this.onClose} type="primary">
                  Submit
                </Button>
              </div>
            }
            */
          >
           {/* <ChooseForm type={this.state.type}/> */}
          <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                    name="title"
                    label="Title"
                  rules={[{ required: true, message: 'Please enter to-do title' }]}
                >
                  <Input placeholder="Please enter to-do title" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true, message: 'Please choose the type' }]}
                >
                  <Select placeholder="Please choose the type">
                    <Option value="personal">Personal</Option>
                    <Option value="group">Group</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="deadline"
                  label="DeadLine"
                  rules={[{ required: true, message: 'Please choose the deadline' }]}
                >
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentNode}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter  description" />
                </Form.Item>
              </Col>
            </Row>
          <Form.Item>
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button htmlType='submit' onClick={this.onClose} type="primary">
                  Submit
                </Button>
            </Form.Item>
          </Form>
        </Drawer>
            {/* Sample1: <MyCard/> LIST may be better? */}
            {/* Sample2: <MyList/>*/}
            {/* Sample3: popup drawer */}
            <MyCard/>
            </Space>
          </Content>
        <Sider width={150} className="Quick-functions">
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<CarryOutOutlined />} title="Task">
            {/*<MyList data={data1}/>  */}
            <Checkbox.Group options={options} /*defaultValue={['Pear']}*/ onChange={onChange} />
            <div align='right'>
            <Button type='primary' shape="circle" onClick={this.showDrawer}>+</Button>
            </div>
            </SubMenu>
          </Menu>
          </Sider>
        </Layout>
      </Layout>
    </Layout>

    
  )}
}
export default SiderTwoCopy;