import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Avatar } from 'antd'
import { withRouter } from 'react-router'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons'

const { Header } = Layout

class TopHeader extends Component {
  state = {
    collapsed: false
  }

  render() {
    const currentUser = JSON.parse(localStorage.getItem('token')).username
    const menu = (
      <Menu onClick={this.handlerMenu}>
        <Menu.Item key="role">
          {JSON.parse(localStorage.getItem('token')).roleName}
        </Menu.Item>
        <Menu.Item key="exit">退出登录</Menu.Item>
      </Menu>
    )

    return (
      <Header className="site-layout-background">
        {React.createElement(
          this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: this.toggle
          }
        )}
        <div style={{ float: 'right' }}>
          <span style={{ marginRight: '10px' }}>欢迎{currentUser}回来</span>
          <Dropdown overlay={menu}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
    )
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  handlerMenu = (obj) => {
    if (obj.key === 'exit') {
      localStorage.removeItem('token')
      this.props.history.push('/login')
    }
  }
}

export default withRouter(TopHeader)
