import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

export default class MyForm2 extends React.Component {
    render(){
        return(
    <Form layout="vertical" hideRequiredMark>
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
  </Form>
        )
}
}
