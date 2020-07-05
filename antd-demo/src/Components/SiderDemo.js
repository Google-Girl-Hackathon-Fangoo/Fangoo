import React,{Component} from 'react';
import 'antd/dist/antd.css';
import './SiderDemo.css';
import SiderTwo from './SiderTwo.js';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb,Button,Space,Dropdown } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class SiderDemo extends Component{
  render(){
    return (
    <Layout>
      <Header className="header">
        <Space size={350}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/SiderDemo">page 1</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/SiderTwo">page 2</Link></Menu.Item>
          <Menu.Item key="3">page 3</Menu.Item>
        </Menu>
       <Button type="primary"><Link to="/SiderDemo/Mylogin">用户</Link></Button>
  
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
            <SubMenu key="sub1" icon={<UserOutlined />} title="个人信息">
              <Menu.Item key="1">日程</Menu.Item>
              <Menu.Item key="2">近期使用情况</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="小组合作">
              <Menu.Item key="5">Group Name 1</Menu.Item>
              <Menu.Item key="6">Group Name 2</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
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
            公告区
          </Content>
        <Sider width={150} className="Quick-functions">
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
        <SubMenu key="sub1" icon={<UserOutlined />} title="Add">
              <Menu.Item key="5">添加好友</Menu.Item>
              <Menu.Item key="6">添加群</Menu.Item>
        </SubMenu>
             <Menu.Item key="1">签到</Menu.Item>
              <Menu.Item key="2">安排会议</Menu.Item>
              <Menu.Item key="3">增加任务</Menu.Item>
              <Menu.Item key="4">生成报表</Menu.Item>
          </Menu>
          </Sider>
        </Layout>
      </Layout>
    </Layout>
  )}
}
