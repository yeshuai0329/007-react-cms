import React, { Component } from 'react'
import Particles from 'react-particles-js'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import style from './login.module.css'
import axios from 'axios'

export default class Login extends Component {
  render() {
    return (
      <div style={{ background: 'rgb(35, 39, 65)' }}>
        <Particles height={window.innerHeight - 6}></Particles>
        <div className={style.container}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!'
                }
              ]}
              style={{ marginBottom: '35px' }}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!'
                }
              ]}
              style={{ marginBottom: '35px' }}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={style.loginFormButton}
              >
                Log in
              </Button>
              Or <a href="aaa">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
  onFinish = (values) => {
    axios
      .get(
        `http://localhost:8080/users?username=${values.username}&password=${
          values.password
        }&roleState=${true}`
      )
      .then((res) => {
        if (res.data.length === 1) {
          localStorage.setItem('token', JSON.stringify(res.data[0]))
          this.props.history.push('/home')
        } else {
          message.error('账号或者密码错误')
        }
      })
  }
}
