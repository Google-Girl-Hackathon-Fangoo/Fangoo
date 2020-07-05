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

export default class MyForm1 extends React.Component {
    render(){
        return(
    <Form layout="vertical" hideRequiredMark>
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
            <Option value="personal">Personal</Option>
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
              message: 'please enter url description',
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="please enter url description" />
        </Form.Item>
      </Col>
    </Row>
  </Form>
        )
}
}
