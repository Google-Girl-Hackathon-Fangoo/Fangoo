import React,{Component} from 'react';
import 'antd/dist/antd.css';
import './SiderDemo.css';
import SiderTwo from './SiderTwo.js';
import { Link } from 'react-router-dom';
import { Checkbox,Form,DatePicker,Col,Input,Select,message,Modal,Cascader, Row, Layout, Menu, Breadcrumb,Button,Space,Dropdown } from 'antd';
import { LockOutlined,UserOutlined, TeamOutlined,UsergroupAddOutlined, ScheduleOutlined, CarryOutOutlined, NotificationOutlined } from '@ant-design/icons';
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
const data21 = [
  'Personal Schedule',
];
const data3 = [
  'Group Task',
];
const data31 = [
  'Personal Task',
];
const data4=[
  'Notification1',
  'Notification2',
  'Notification3',
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

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
const { RangePicker } = DatePicker;

function onChange1(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk1(value) {
  console.log('onOk: ', value);
}

var user_name="user1";
/*
var children=[];
const getuser=axios.get("/users")
    .then(res=>{
      console.log(res);
      children=res.data;
      return res;
    });
var gg=getuser;
*/
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}
export default class SiderDemo extends Component{
  state = { visible: false,visible1: false,visible2: false,
    visible3:false,visible4:false,visible5:false,
    visible6:false,visible7:false,visible8:false };
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  showModal1 = () => {
    this.setState({
      visible1: true,
    });
  };

  handleOk1 = e => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  };

  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible1: false,
    });
  };
  showModal2 = () => {
    this.setState({
      visible2: true,
    });
  };

  handleOk2 = e => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };

  handleCancel2 = e => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };
  showModal3 = () => {
    this.setState({
      visible3: true,
    });
  };

  handleOk3 = e => {
    console.log(e);
    this.setState({
      visible3: false,
    });
  };

  handleCancel3 = e => {
    console.log(e);
    this.setState({
      visible3: false,
    });
  };
  showModal4 = () => {
    this.setState({
      visible4: true,
    });
  };

  handleOk4 = e => {
    console.log(e);
    this.setState({
      visible4: false,
    });
  };

  handleCancel4 = e => {
    console.log(e);
    this.setState({
      visible4: false,
    });
  };
  showModal5 = () => {
    this.setState({
      visible5: true,
    });
  };

  handleOk5 = e => {
    console.log(e);
    this.setState({
      visible5: false,
    });
  };

  handleCancel5 = e => {
    console.log(e);
    this.setState({
      visible5: false,
    });
  };
  showModal6 = () => {
    this.setState({
      visible6: true,
    });
  };

  handleOk6 = e => {
    console.log(e);
    this.setState({
      visible6: false,
    });
  };

  handleCancel6 = e => {
    console.log(e);
    this.setState({
      visible6: false,
    });
  };
  showModal7 = () => {
    this.setState({
      visible7: true,
    });
  };

  handleOk7 = e => {
    console.log(e);
    this.setState({
      visible7: false,
    });
  };

  handleCancel7 = e => {
    console.log(e);
    this.setState({
      visible7: false,
    });
  };
  showModal8 = () => {
    this.setState({
      visible8: true,
    });
  };
  handleOk8 = e => {
    console.log(e);
    this.setState({
      visible8: false,
    });
  };
  handleCancel8 = e => {
    console.log(e);
    this.setState({
      visible8: false,
    });
  };
  render(){
    const onFinish = (values) => {
      console.log(values)
      axios.post("/users/login",{
        data: values
      }).then((response)=>{
        console.log(response.data)
        if (response.data.msg === 'success'){
          console.log(values.username);
          user_name=values.username;
          message.success('Login Succed!')
        }else{
          message.warn('Login Failed')
        }
      })
    }
    const onFinish1 = (values) => {
      console.log(values)
      axios.post("/users/sign-in",{
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
    const onFinish2 = (values) => {
      console.log(values)
      axios.post("/users/schedule",{
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
    const onFinish3 = (values) => {
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
    const onFinish4 = (values) => {
      console.log(values)
      axios.post("/users/addgroup",{
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
    const onFinish5 = (values) => {
      console.log(values)
      axios.post("/users/notification",{
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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/SiderDemo">page 1</Link></Menu.Item>
          <Menu.Item key="2"><Link to={"/SiderTwo"+"/"+user_name}>page 2</Link></Menu.Item>
          <Menu.Item key="3">page 3</Menu.Item>
          <Menu.Item key="4">page 4</Menu.Item>
        </Menu>
       <Button type="primary" onClick={this.showModal}>{user_name}</Button>
       <Modal
            title="Log-in"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Space size='large'>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <Button><Link to="/MyRegister">register now!</Link></Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
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
              <Menu.Item key="1"><Link to={"/SiderTwo"+"/"+user_name}>日程</Link></Menu.Item>
              <Menu.Item key="2">近期使用情况</Menu.Item>
              <div align='middle'>
              <Button type='text' onClick={this.showModal1}>
                Notification
              </Button>
              </div>
              <Modal
                 title="Notification"
                 visible={this.state.visible1}
                 onOk={this.handleOk1}
                 onCancel={this.handleCancel1}
              >
              <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1','sub2','sub3']}
            style={{ height: '100%', borderRight: 0 }}
          >
              <SubMenu key="sub1" icon={<NotificationOutlined />} title="Group Notification">
                  <MyList data={data1}/> 
              </SubMenu>
              <SubMenu key="sub2" icon={<ScheduleOutlined />} title="Schedule">
                <Row>
                  <MyList data={data2}/>
                </Row>
                <Row>
                  <MyList data={data21}/>
                  </Row> 
              </SubMenu>
              <SubMenu key="sub3" icon={<CarryOutOutlined />} title="Task">
              <Row>
                  <MyList data={data3}/>
                </Row>
                <Row>
                  <MyList data={data31}/>
                  </Row> 
              </SubMenu>
                </Menu>
              </Modal>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="小组合作"></SubMenu>
            <Row>
          <LazyOptions />
          </Row>
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
          Chat Box
          </Content>
        <Sider width={150} className="Quick-functions">
          <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="sub1" icon={<UsergroupAddOutlined />} title="Add">
                <div align='middle'>
                <Button type='text'>添加好友</Button>
                <Button type='text' onClick={this.showModal6}>添加群</Button>
                <Modal
                 title="添加群"
                 visible={this.state.visible6}
                 onOk={this.handleOk6}
                 onCancel={this.handleCancel6}
                >
                <Form layout="vertical" hideRequiredMark onFinish={onFinish4}>
                  <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                            name="group name"
                            label="Group Name"
                          rules={[{ required: true, message: 'Please enter group name' }]}
                        >
                          <Input placeholder="Please enter group name" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="group member"
                          label="Member Select"
                          rules={[{ required: true, message: 'Please choose group member' }]}
                        >
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        onChange={handleChange}
                      >
                      {children}
                      </Select>
                      </Form.Item>
                      </Col>
                    </Row >

                  <Row>
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                          Cancel
                        </Button>
                        <Button htmlType='submit' onClick={this.onClose} type="primary">
                          Submit
                        </Button>
                    </Row>
                  
                </Form>
                </Modal>
                </div>
                </SubMenu>

              <div align='left'>
              <Button type='text' onClick={this.showModal2}>
                群签到
              </Button>
              </div>
              <Modal
                 title="群签到"
                 visible={this.state.visible2}
                 onOk={this.handleOk2}
                 onCancel={this.handleCancel2}
              >
                <Row>
                <div align='right'>
                <Button onClick={this.showModal3}>发起签到</Button>
                </div>
                </Row>
                <Modal
                 title="发起群签到"
                 visible={this.state.visible3}
                 onOk={this.handleOk3}
                 onCancel={this.handleCancel3}
                >
                <Form layout="vertical" hideRequiredMark  onFinish={onFinish1}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="Time"
                        label="Time"
                        rules={[{ required: true, message: 'Please choose the Time' }]}
                      >
                        <RangePicker
                          showTime={{ format: 'HH:mm' }}
                          format="YYYY-MM-DD HH:mm"
                          onChange={onChange1}
                          onOk={onOk1}
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
                </Modal>
              <Row>
              签到1<Button>确认签到</Button>
              </Row>
              
              </Modal>
                <Button type='text' onClick={this.showModal7}>群公告</Button>
                
                <Modal
                 title="群公告"
                 visible={this.state.visible7}
                 onOk={this.handleOk7}
                 onCancel={this.handleCancel7}
              >
                <Row>
                <div align='right'>
                <Button onClick={this.showModal8}>发布群公告</Button>
                </div>
                </Row>
                <Modal
                 title="发布群公告"
                 visible={this.state.visible8}
                 onOk={this.handleOk8}
                 onCancel={this.handleCancel8}
                >
                <Form layout="vertical" hideRequiredMark  onFinish={onFinish5}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="notification"
                        label="Notification"
                        rules={[
                          {
                            required: true,
                            message: 'please enter notification',
                          },
                        ]}
                      >
                        <Input.TextArea rows={4} placeholder="please enter notification" />
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
                </Modal>
              <Row>
                Group Notifications:
              </Row>
              <Row>
                <MyList data={data4}/> 
              </Row>
              
              </Modal>
                
                <Button type='text' onClick={this.showModal4}>安排群会议</Button>
                <Modal
                 title="安排群会议"
                 visible={this.state.visible4}
                 onOk={this.handleOk4}
                 onCancel={this.handleCancel4}
                >
                <Form layout="vertical" hideRequiredMark  onFinish={onFinish2}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                          name="name"
                          label="Name"
                        rules={[{ required: true, message: 'Please enter user name' }]}
                      >
                        <Input placeholder="Please enter user name" />
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
                          <Option value="group">Group</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="cooperator"
                        label="Cooperator"
                        rules={[{ required: true, message: 'Please choose the approver' }]}
                      >
                        <Select placeholder="Please choose the approver">
                          <Option value="jack">Jack Ma</Option>
                          <Option value="tom">Tom Liu</Option>
                        </Select>
                      </Form.Item>
                    </Col>
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
                </Modal>
                <Button type='text' onClick={this.showModal5}>增加群任务</Button>
                <Modal
                 title="安排群任务"
                 visible={this.state.visible5}
                 onOk={this.handleOk5}
                 onCancel={this.handleCancel5}
                >
                <Form layout="vertical" hideRequiredMark onFinish={onFinish3}>
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
                </Modal>
                <Button type='text'>生成群报表</Button>
            </Menu>
          </Sider>
        </Layout>
      </Layout>
    </Layout>
  )}
}
