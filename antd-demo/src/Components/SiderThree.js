import React,{Component} from 'react';
import 'antd/dist/antd.css';
import './SiderDemo.css';
import SiderTwo from './SiderTwo.js';
import { Link } from 'react-router-dom';
import { message,Form,Col,Row, Layout,Input,Menu, DatePicker,Button,Space,Drawer, Select,Cascader } from 'antd';
import { UsergroupAddOutlined, ScheduleOutlined, CarryOutOutlined, NotificationOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import MyList from './MyList.js';
import axios from 'axios';
const { Option } = Select;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const data1 = [
    'Group Notification',
  ];
const data2 = [
    'Group Schedule',
  ];
const data3 = [
    'Group Task',
  ];
const options = [
    {
      value: 'Group1',
      label: 'group1',
      isLeaf: false,
    },
    {
      value: 'Group2',
      label: 'group2',
      isLeaf: false,
    },
  ];
class LazyOptions extends React.Component {
    state = {
      options,
    };
  
    onChange = (value, selectedOptions) => {
      console.log(value, selectedOptions);
    };
  
    loadData = selectedOptions => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
  
      // load options lazily
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
          {
            label: `${targetOption.label} Dynamic 1`,
            value: 'dynamic1',
          },
          {
            label: `${targetOption.label} Dynamic 2`,
            value: 'dynamic2',
          },
        ];
        this.setState({
          options: [...this.state.options],
        });
      }, 1000);
    };
    render(){
        return(
            <Cascader
                options={this.state.options}
                loadData={this.loadData}
                onChange={this.onChange}
                changeOnSelect
            />
        )
    }
};
export default class SiderThree extends Component{
  state = { visible: false};
  showDrawer=() =>{
    this.setState({
      visible: true
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
      axios.post("/users/group_schedule",{
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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
          <Menu.Item key="1"><Link to="/SiderDemo">page 1</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/SiderTwo">page 2</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/SiderThree">page 3</Link></Menu.Item>
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
            defaultOpenKeys={['sub1','sub2','sub3']}
            style={{ height: '100%', borderRight: 0 }}
          >
         <SubMenu key="sub1" icon={<NotificationOutlined />} title="Group Notification">
            <MyList data={data1}/> 
         </SubMenu>
         <SubMenu key="sub2" icon={<ScheduleOutlined />} title="Group Schedule">
            <MyList data={data2}/> 
         </SubMenu>
         <SubMenu key="sub3" icon={<CarryOutOutlined />} title="Group Task">
            <MyList data={data3}/> 
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
          <Row>
          Group： 
          <LazyOptions />
          </Row>
          Chat Box
          </Content>
              <Drawer
                  title="Create a new group-schedule"
                  width={720}
                  onClose={this.onClose}
                  visible={this.state.visible}
                  bodyStyle={{ paddingBottom: 80 }}
                >
                <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                      rules={[{ required: true, message: 'Please enter schedule name' }]}
                    >
                      <Input placeholder="Please enter schedule name" />
                    </Form.Item>
                  </Col>
                </Row>
           <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[{ required: true, message: 'Please choose the dateTime' }]}
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
                      <Input.TextArea rows={4} placeholder="please enter description" />
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
        <Sider width={150} className="Quick-functions">
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
              <SubMenu key="sub1" icon={<UsergroupAddOutlined />} title="Add">
              <Menu.Item key="5">添加好友</Menu.Item>
              <Menu.Item key="6">添加小组</Menu.Item>
              </SubMenu>
              <Button type='text'>群签到</Button>
              <Button type='text' onClick={this.showDrawer}>安排会议</Button>
              <Button type='text'>增加任务</Button>
              <Button type='text'>生成报表</Button>
          </Menu>
          </Sider>
        </Layout>
      </Layout>
    </Layout>
  )}
}
