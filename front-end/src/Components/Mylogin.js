import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { message,Form, Input, Button, Checkbox,Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import MyRegister from './MyRegister.js';
import axios from 'axios';
export default class Mylogin extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    /*
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  */
  const onFinish = (values) => {
    console.log(values)
    axios.post("/users/login",{
      data: values
    }).then((response)=>{
      console.log(response.data)
      if (response.data.msg === 'success'){
        message.success('Login Succed!')
      }else{
        message.warn('Login Failed')
      }
    })
  }

  return (
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
  );
};
};