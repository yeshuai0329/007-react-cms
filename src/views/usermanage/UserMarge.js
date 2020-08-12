import React, { Component } from 'react'
import { Button, Table, Switch, Modal, Form, Input, Select } from 'antd'
import axios from 'axios'

const { Option } = Select
export default class UserMarge extends Component {
  state = {
    datalist: [],
    disabled: true,
    isVisible: false,
    isUpdate: false
  }
  columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      align: 'center',
      render: (roleName) => <b>{roleName}</b>
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      align: 'center'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      key: 'roleState',
      align: 'center',
      render: (roleState, item) => (
        <Switch
          defaultChecked={roleState}
          disabled={item.default}
          onChange={() => {
            this.onChange(item)
          }}
        />
      )
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (item) => {
        return (
          <div>
            <Button
              type="primary"
              style={{ marginRight: '5px' }}
              disabled={item.default}
              onClick={() => {
                this.updateClick(item)
              }}
            >
              Editor
            </Button>
            <Button
              type="primary"
              danger
              style={{ marginLeft: '5px' }}
              disabled={item.default}
              onClick={() => {
                this.delHandler(item.id)
              }}
            >
              Delate
            </Button>
          </div>
        )
      }
    }
  ]
  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={this.addHandlerOne}
          style={{ marginBottom: '20px' }}
        >
          添加用户
        </Button>
        <Table
          columns={this.columns}
          dataSource={this.state.datalist}
          rowKey={(item) => item.id}
        />
        {/* 添加用户的模态框 */}
        <Modal
          visible={this.state.isVisible}
          title="添加一个账户"
          okText="确定"
          cancelText="取消"
          onCancel={this.onCancelClick}
          onOk={this.okClick}
        >
          <Form
            ref="form"
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: 'public'
            }}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: 'Please input the title of collection!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: 'Please input the title of collection!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="roleType"
              label="角色名称"
              rules={[
                {
                  required: true,
                  message: 'Please input the title of collection!'
                }
              ]}
            >
              <Select>
                <Option value={3}>超级管理员</Option>
                <Option value={2}>管理员</Option>
                <Option value={1}>小编</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        {/* 更新用户的模态框 */}
        <Modal
          visible={this.state.isUpdate}
          title="更新账户"
          okText="更新"
          cancelText="取消"
          onCancel={this.onCancelClick}
          onOk={this.updateHandler}
        >
          <Form
            ref="updateForm"
            layout="vertical"
            name="form_in_modal"
            initialValues={{
              modifier: 'public'
            }}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                {
                  required: true,
                  message: 'Please input the title of collection!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                {
                  required: true,
                  message: 'Please input the title of collection!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="roleType"
              label="角色名称"
              rules={[
                {
                  required: true,
                  message: 'Please input the title of collection!'
                }
              ]}
            >
              <Select>
                <Option value={3}>超级管理员</Option>
                <Option value={2}>管理员</Option>
                <Option value={1}>小编</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
  componentDidMount() {
    axios.get('http://localhost:8080/users').then((res) => {
      this.setState({
        datalist: res.data
      })
    })
  }
  //开关按钮状态
  onChange = (item) => {
    let { roleState } = item
    var newlist = this.state.datalist.concat()
    newlist.forEach((listItem) => {
      if (listItem.id === item.id) {
        listItem.roleState = !roleState
        axios.put(`http://localhost:8080/users/${item.id}`, { ...listItem })
      }
    })
    this.setState({
      datalist: [...newlist]
    })
  }
  // 添加用户模态框对应的处理函数
  addHandlerOne = () => {
    this.setState({
      isVisible: true
    })
  }
  onCancelClick = () => {
    this.setState({
      isVisible: false,
      isUpdate: false
    })
  }
  okClick = () => {
    this.refs.form
      .validateFields()
      .then((values) => {
        this.refs.form.resetFields()
        this.onCreate(values)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }
  onCreate = (values) => {
    let arr = ['小编', '管理员', '超级管理员']
    let { username, password, roleType } = values
    axios
      .post('http://localhost:8080/users', {
        username,
        password,
        roleName: arr[roleType - 1],
        roleState: false,
        roleType
      })
      .then((res) => {
        this.setState({
          isVisible: false,
          datalist: [...this.state.datalist, res.data]
        })
      })
  }
  delHandler = (id) => {
    axios.delete(`http://localhost:8080/users/${id}`).then(() => {
      var newdatalist = this.state.datalist.filter((item) => item.id !== id)
      this.setState({
        datalist: [...newdatalist]
      })
    })
  }

  //更新模态框对应的处理函数
  updateClick = (item) => {
    setTimeout(() => {
      this.setState({
        isUpdate: true,
        currentId: item.id
      })
      this.refs.updateForm.setFieldsValue({
        username: item.username,
        password: item.password,
        roleType: item.roleType
      })
    }, 0)
  }
  updateHandler = () => {
    this.refs.updateForm
      .validateFields()
      .then((values) => {
        this.refs.updateForm.resetFields()
        this.onUpdate(values)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }
  onUpdate = (values) => {
    var selarr = this.state.datalist.filter(
      (item) => item.id === this.state.currentId
    )
    let arr = ['小编', '管理员', '超级管理员']
    let { username, password, roleType } = values
    axios
      .put(`http://localhost:8080/users/${selarr[0].id}`, {
        username,
        password,
        roleName: arr[roleType - 1],
        roleState: false,
        roleType
      })
      .then(() =>
        axios.get('http://localhost:8080/users').then((res) =>
          this.setState({
            isUpdate: false,
            datalist: [...res.data]
          })
        )
      )
  }
}
