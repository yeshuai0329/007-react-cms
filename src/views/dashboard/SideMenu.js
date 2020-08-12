import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import MenuArr from '../../router/menu.js'
import { withRouter } from 'react-router'

const { Sider } = Layout
const { SubMenu } = Menu

class SideMenu extends Component {
  state = {
    collapsed: false
  }

  render() {
    let itemkey = '/' + this.props.location.pathname.split('/')[1]
    return (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          onClick={this.handlerChangePage}
          defaultSelectedKeys={[this.props.location.pathname]}
          defaultOpenKeys={[itemkey]}
        >
          {this.renderMenu(MenuArr)}
        </Menu>
      </Sider>
    )
  }
  renderMenu = (menulist) => {
    var { roleType } = JSON.parse(localStorage.getItem('token'))
    console.log(roleType)
    return menulist.map((item) => {
      if (item.children && roleType >= item.permission) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                {<item.icon />}
                <span>{item.title}</span>
              </span>
            }
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      } else {
        if (roleType >= item.permission) {
          return (
            <Menu.Item key={item.path}>
              {<item.icon />}
              {item.title}
            </Menu.Item>
          )
        } else {
          return null
        }
      }
    })
  }

  handlerChangePage = (obj) => {
    this.props.history.push(obj.key)
  }
}

export default withRouter(SideMenu)
