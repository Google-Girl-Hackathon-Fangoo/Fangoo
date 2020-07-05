import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Space, Tooltip, Drawer, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './SiderTwo.css';
import SiderDemo from './SiderDemo.js';
import MyCalendar from './MyCalendar.js';
import MyCard from './MyCard.js';
import MyList from './MyList.js';
import MyForm1 from './MyForm1.js';
import MyForm2 from './MyForm2.js';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;
const data1 = [
  'to-do 1',
  'to-do 2',
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
class SiderTwo extends Component{
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
    return (
    <Layout>
       <Header className="header">
        <Space size={350}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1"><Link to="/SiderDemo">page 1</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/SiderTwo">page 2</Link></Menu.Item>
          <Menu.Item key="3">page 3</Menu.Item>
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
            <SubMenu key="sub1" icon={<UserOutlined />} title="日程">
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
            <Button type="primary" shape="circle" onClick={this.showDrawer1}>+</Button>
            </div>
          <Drawer
            title="Create a new schedule"
            width={720}
            onClose={this.onClose}
            visible={this.state.visible}
            bodyStyle={{ paddingBottom: 80 }}
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
          >
            <ChooseForm type={this.state.type}/>
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
            defaultSelectedKeys={['2']}
            defaultOpenKeys={['sub2']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1">任务</Menu.Item>
            <MyList data={data1}/> 
            <div align='right'>
              <Tooltip title='Click twice'>
            <Button type='primary' shape="circle"><Link to="/SiderTwoCopy">+</Link></Button>
              </Tooltip>
            </div>
          </Menu>
          </Sider>
        </Layout>
      </Layout>
    </Layout>

    
  )}
}
export default SiderTwo;