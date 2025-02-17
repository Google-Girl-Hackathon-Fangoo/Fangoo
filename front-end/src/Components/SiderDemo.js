import React,{Component} from 'react';
import 'antd/dist/antd.css';
import './SiderDemo.css';
import SiderTwo from './SiderTwo.js';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';
import { Checkbox,Form,DatePicker,Col,Input,Select,message,Modal,Cascader, Row, Layout, Menu, Breadcrumb,Button,Space,Dropdown } from 'antd';
import {LockOutlined,UserOutlined, TeamOutlined,UsergroupAddOutlined, ScheduleOutlined, CarryOutOutlined, NotificationOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import MyList from './MyList.js';
import axios from 'axios';
const { Option } = Select;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

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
var selected_id=0;
var notif=[];
var task=[];
var deltask=[];
var groupid=[];
var groupidcom=[];
var idlist=[<Option value={1}>{1}</Option>];
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
function onChangeS(value) {
  selected_id=value;
  console.log(`selected ${value}`);
}

function onBlurS() {
  console.log("blur");
}

function onFocusS() {
  console.log("focus");
}

function onSearchS(val) {
  console.log("search:", val);
}
function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
function onChange2(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk2(value) {
  console.log('onOk: ', value);
}
const { RangePicker } = DatePicker;

function onChange1(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk1(value) {
  console.log('onOk: ', value);
}
var user_name="User";
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
class get_sign_in extends Component{
  constructor(props){
    super(props);
  };
  render(){
    var children=[];
    const getuser=axios.get("/sign_in/done")
        .then(res=>{
          console.log(res);
          children=res.data;
        return res;
    });
    var gg=getuser;
    return children;
  }
}
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class SiderDemo extends Component{
  constructor(props){
    super(props);
    this.notif=[];
    this.state = {
      isLoading : false
    }
  };
  componentWillMount(){
    console.log(this.props);
    this.setState({
      isLoading : true
    })
    this.loadData([{"user_name":user_name}])
  }
  loadData = (values) => {
    notif=[];
    groupid=[];
    groupidcom=[];
    console.log(values[0].user_name)
    axios.post("/users/personaltask/queryflock",
      {data:{ flockid:selected_id,username: values[0].user_name,date:moment().format('YYYY-MM-DD')}}
    ).then((response)=>{
      console.log(response.data)
      for (let item of response.data) {
        notif.push(item.taskName);
        //deltask.push(<Option value={item.taskName}>{item.taskName}</Option>);
      }
    })
    axios.post("/users/lookflockid",
      {data:{ userName: values[0].user_name,type:1}}
    ).then((response)=>{
      console.log(response)
      for (let item of response.data) {
        groupid.push(item.flockid);
        //deltask.push(<Option value={item.taskName}>{item.taskName}</Option>);
      }
      console.log(groupid);
    })
    axios.post("/users/lookflockid",
      {data:{ userName: values[0].user_name,type:0}}
    ).then((response)=>{
      console.log(response)
      for (let item of response.data) {
        groupidcom.push(item.flockid);
        //deltask.push(<Option value={item.taskName}>{item.taskName}</Option>);
      }
    })
    this.setState({
      groupidcom:groupidcom,
      groupid:groupid,
      notif: notif,
      isLoading : false
    })
  }
  state = { visible: false,visible1: false,visible2: false,
    visible3:false,visible4:false,visible5:false,
    visible6:false,visible7:false,visible8:false,
    visibleaddm:false,visibledelm:false,visiblegiver:false,
    visibledropr:false,visiblequit:false,visiblech:false,
    visibleid:false};
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
  showModaladdm = () => {
    this.setState({
      visibleaddm: true,
    });
  };
  handleOkaddm = e => {
    console.log(e);
    this.setState({
      visibleaddm: false,
    });
  };
  handleCanceladdm = e => {
    console.log(e);
    this.setState({
      visibleaddm: false,
    });
  };
  showModaldelm = () => {
    this.setState({
      visibledelm: true,
    });
  };
  handleOkdelm = e => {
    console.log(e);
    this.setState({
      visibledelm: false,
    });
  };
  handleCanceldelm = e => {
    console.log(e);
    this.setState({
      visibledelm: false,
    });
  };

  showModalgiver = () => {
    this.setState({
      visiblegiver: true,
    });
  };
  handleOkgiver = e => {
    console.log(e);
    this.setState({
      visiblegiver: false,
    });
  };
  handleCancelgiver = e => {
    console.log(e);
    this.setState({
      visiblegiver: false,
    });
  };
  showModaldropr = () => {
    this.setState({
      visibledropr: true,
    });
  };
  handleOkdropr = e => {
    console.log(e);
    this.setState({
      visibledropr: false,
    });
  };
  handleCanceldropr = e => {
    console.log(e);
    this.setState({
      visibledropr: false,
    });
  };

  showModalquit = () => {
    this.setState({
      visiblequit: true,
    });
  };
  handleOkquit = e => {
    console.log(e);
    this.setState({
      visiblequit: false,
    });
  };
  handleCancelquit = e => {
    console.log(e);
    this.setState({
      visiblequit: false,
    });
  };

  showModalch = () => {
    this.setState({
      visiblech: true,
    });
  };
  handleOkch = e => {
    console.log(e);
    this.setState({
      visiblech: false,
    });
  };
  handleCancelch = e => {
    console.log(e);
    this.setState({
      visiblech: false,
    });
  };
  showModalid = () => {
    this.setState({
      visibleid: true,
    });
  };
  handleOkid = e => {
    console.log(e);
    this.setState({
      visibleid: false,
    });
  };
  handleCancelid = e => {
    console.log(e);
    this.setState({
      visibleid: false,
    });
  };
  render(){
    const checkindone = (values) => {
      console.log(values)
      axios.post("/sign_in/done",{
        data: {flockId:selected_id,username:user_name}
      }).then((response)=>{
        console.log(response.data)
        if (response.data.msg === 'success'){
          console.log(values.username);
          user_name=values.username;
          message.success('Sign-in Succed!')
        }else{
          message.warn('Sign-in Failed')
        }
      })
    }
    const onFinish = (values) => {
      console.log(values)
      axios.post("/users/login",{
        data: values
      }).then((response)=>{
        console.log(response.data)
        if (response.data.msg === 'success'){
          console.log(values.username);
          user_name=values.username;
          this.loadData([{"user_name":user_name}])
          message.success('Login Succed!')
        }else{
          message.warn('Login Failed')
        }
      })
    }
    const onFinish1 = (values) => {
      console.log(values)
      axios.post("/sign_in/add",{
        data: {flockId:selected_id,beginTime:values.Time[0].format('YYYY-MM-DD HH:mm:ss'),
          endTime:values.Time[1].format('YYYY-MM-DD HH:mm:ss'),description:values.description}
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
      axios.post("/users/addflock",{
        data: {username:user_name,title:values.groupname}
      }).then((response)=>{
        console.log(response);
        selected_id=response.data.flockId;
        idlist.push(<Option value={response.data.flockId}>{response.data.flockId}</Option>);
        //idlist.push(response.data.flockId);
        console.log(idlist);
        if (response.data.msg === 'success'){
          message.success('Create Succed!')
        }else{
          message.warn('Create Failed')
        }
      })
    }
    const onFinish5 = (values) => {
      console.log(values)
      axios.post("/users/addflockannounce",{
        data: {flockId:selected_id,
              announcer:user_name,title:values.title,
            description:values.description,deadline:values.deadline.format('YYYY-MM-DD HH:mm:ss')}
      }).then((response)=>{
        console.log(response.data)
        if (response.data.msg === 'success'){
          message.success('Create Succed!')
        }else{
          message.warn('Create Failed')
        }
      })
    }
    const onFinishaddm = (values) => {
      console.log(values)
      axios.post("/users/adduser",{
        data: {username:user_name,searchid:values.searchid,
              flockid:selected_id}
      }).then((response)=>{
        console.log(response.data)
        if (response.data.msg === 'success'){
          message.success('Create Succed!')
        }else{
          message.warn('Create Failed')
        }
      })
    }
    const onFinishdelm = (values) => {
      console.log(values)
      axios.post("/users/deluser",{
        data: {username:user_name,searchid:values.searchid,
              flockid:selected_id}
      }).then((response)=>{
        console.log(response.data)
        if (response.data.msg === 'success'){
          message.success('Create Succed!')
        }else{
          message.warn('Create Failed')
        }
      })
    }
    const onFinishgiver = (values) => {
      console.log(values)
      axios.post("/users/give",{
        data: {username:user_name,searchid:values.searchid,
              flockid:selected_id}
      }).then((response)=>{
        console.log(response.data)
        if (response.data.msg === 'success'){
          message.success('Create Succed!')
        }else{
          message.warn('Create Failed')
        }
      })
    }
    const onFinishdropr = (values) => {
      console.log(values)
      axios.post("/users/drop",{
        data: {username:user_name,searchid:values.searchid,
              flockid:selected_id}
      }).then((response)=>{
        console.log(response.data)
        if (response.data.msg === 'success'){
          message.success('Create Succed!')
        }else{
          message.warn('Create Failed')
        }
      })
    }
    const onFinishquit = (values) => {
      console.log(values)
      axios.post("/users/quit",{
        data: {username:user_name,flockid:selected_id}
      }).then((response)=>{
        console.log(response.data)
        if (response.data.msg === 'success'){
          message.success('Create Succed!')
        }else{
          message.warn('Create Failed')
        }
      })
    }
    const onFinishch = (values) => {
      selected_id=values.groupid;
      this.loadData([{"user_name":user_name}])
      console.log(values);
    }
    const onFinishid = (values) => {
      this.loadData([{"user_name":user_name}])
      console.log(values);
    }
    let {isLoading} = this.state
    console.log("render" + isLoading)
    /*
    if (isLoading){
      return (
        <div> waiting</div>
      )
    }*/
      
    console.log("render" + isLoading)
    return (
    <Layout>
      <Header className="header">
        <Space size={385}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/SiderDemo">page 1</Link></Menu.Item>
          <Menu.Item key="2"><Link to={{pathname:'/SiderTwo',query:{name:user_name,task:task,deltask:deltask}}}>page 2</Link></Menu.Item>
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
              <Menu.Item key="1"><Link to={{pathname:'/SiderTwo',query:{name:user_name,task:task,deltask:deltask}}}>日程</Link></Menu.Item>
              {/*<Menu.Item key="2">近期使用情况</Menu.Item> */}
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="小组合作"></SubMenu>
            <div align='middle'>
              <Button type='text' onClick={this.showModal1}>
                查看所有群id
              </Button>
              </div>
              <Modal
                 title="查看所有群id"
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
              <SubMenu key="sub1" icon={<NotificationOutlined />} title="管理员">
                  <MyList data={this.state.groupid}/> 
              </SubMenu>
              <SubMenu key="sub2" icon={<ScheduleOutlined />} title="普通成员">
                <Row>
                  <MyList data={this.state.groupidcom}/>
                </Row>
              </SubMenu>
                </Menu>
              </Modal>
              <div align='middle'>
              <Button type='text'onClick={this.showModalch}>切换群</Button>
              </div>
              <Modal
                 title="切换群"
                 visible={this.state.visiblech}
                 onOk={this.handleOkch}
                 onCancel={this.handleCancelch}
                >
                <Form layout="vertical" hideRequiredMark  onFinish={onFinishch}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="groupid"
                        label="groupid"
                        rules={[
                          {
                            required: true,
                            message: 'please enter groupid',
                          },
                        ]}
                      >
                        <Input.TextArea rows={4} placeholder="please enter groupid" />
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
          {/*<LazyOptions />*/}
          {/*
          <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a task"
                  optionFilterProp="children"
                  onChange={onChangeS}
                  onFocus={onFocusS}
                  onBlur={onBlurS}
                  onSearch={onSearchS}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {idlist}
            </Select>
                */}
          </Row>
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
          <Row>
          flockId:{selected_id}
          </Row>
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
                  {/*
                <Button type='text'>添加好友</Button> */}
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
                            name="groupname"
                            label="Group Name"
                          rules={[{ required: true, message: 'Please enter group name' }]}
                        >
                          <Input placeholder="Please enter group name" />
                        </Form.Item>
                      </Col>
                    </Row>
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
                <Button type='text' onClick={this.showModalquit}>退群</Button>
                <Modal
                 title="退群"
                 visible={this.state.visiblequit}
                 onOk={this.handleOkquit}
                 onCancel={this.handleCancelquit}
                >
                  <Form onFinish={onFinishquit}>
                  确认退出该群吗？
                  <Form.Item>
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                          取消
                        </Button>
                        <Button htmlType='submit' onClick={this.onClose} type="primary">
                          确认退出
                        </Button>
                    </Form.Item>
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
              签到1 <Button onClick={checkindone}>确认签到</Button>
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
                <Form layout="vertical" hideRequiredMark onFinish={onFinish5}>
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
                         <DatePicker showTime onChange={onChange2} onOk={onOk2} />
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
              <Row>
                Group Notifications:
              </Row>
              <Row>
                <MyList data={this.state.notif}/> 
              </Row>
              
              </Modal>
                {/*
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
                         <DatePicker showTime onChange={onChange2} onOk={onOk2} />
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
                        */}
                <Button type='text' onClick={this.showModaladdm}>增加群成员</Button>
                <Modal
                 title="添加群成员"
                 visible={this.state.visibleaddm}
                 onOk={this.handleOkaddm}
                 onCancel={this.handleCanceladdm}
                >
                <Form layout="vertical" hideRequiredMark onFinish={onFinishaddm}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                            name="searchid"
                            label="Searchid"
                          rules={[{ required: true, message: 'Please enter searchid' }]}
                        >
                          <Input placeholder="Please enter searchid" />
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
                <Button type='text' onClick={this.showModaldelm}>删除群成员</Button>
                <Modal
                 title="删除群成员"
                 visible={this.state.visibledelm}
                 onOk={this.handleOkdelm}
                 onCancel={this.handleCanceldelm}
                >
                <Form layout="vertical" hideRequiredMark onFinish={onFinishdelm}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                            name="searchid"
                            label="Searchid"
                          rules={[{ required: true, message: 'Please enter searchid' }]}
                        >
                          <Input placeholder="Please enter searchid" />
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
                <Button type='text' onClick={this.showModalgiver}>给予成员管理权限</Button>
                <Modal
                 title="给予成员管理权限"
                 visible={this.state.visiblegiver}
                 onOk={this.handleOkgiver}
                 onCancel={this.handleCancelgiver}
                >
                <Form layout="vertical" hideRequiredMark onFinish={onFinishgiver}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                            name="searchid"
                            label="Searchid"
                          rules={[{ required: true, message: 'Please enter searchid' }]}
                        >
                          <Input placeholder="Please enter searchid" />
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
                <Button type='text' onClick={this.showModaldropr}>撤销成员管理权限</Button>
                <Modal
                 title="撤销成员管理权限"
                 visible={this.state.visibledropr}
                 onOk={this.handleOkdropr}
                 onCancel={this.handleCanceldropr}
                >
                <Form layout="vertical" hideRequiredMark onFinish={onFinishdropr}>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                            name="searchid"
                            label="Searchid"
                          rules={[{ required: true, message: 'Please enter searchid' }]}
                        >
                          <Input placeholder="Please enter searchid" />
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
            </Menu>
          </Sider>
        </Layout>
      </Layout>
    </Layout>
  )}
}
