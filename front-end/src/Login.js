import React, { Component } from 'react'
import axios from 'axios'
import { message, Form, Input, Button} from 'antd'
import 'antd/dist/antd.css'
import './index.css'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
};

export default class extends Component{
  formRef = React.createRef();
  
  onFinish = (values) => {
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

  render(){
    return(
      <div className='main__container'>
        <div className='main__content'>
          <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} >
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true, message: '请输入用户名',
                },
              ]}
            >
              <Input width = {15}/>
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true, message: '请输入密码',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Button htmlType="button" onClick={this.onReset}>
                注册
              </Button>
              <Button type="link" htmlType="button" onClick={this.onFill}>
                忘记密码
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}