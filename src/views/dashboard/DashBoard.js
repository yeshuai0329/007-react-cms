import React, { Component } from 'react'
import {
  Route, //路由
  Redirect,
  Switch
} from 'react-router-dom'
import Home from '../home/Home.js'
import Error from '../error/Error.js'
import Users from '../usermanage/UserMarge.js'
import Manage from '../right-manage/index.js'
import List from '../artmanage/List.js'
import Category from '../artmanage/Category.js'
import SideMenu from './SideMenu.js'
import TopHeader from './TopHeader.js'
import './index.css'

import { Layout } from 'antd'
const { Content } = Layout
export default class DashBoard extends Component {
  render() {
    return (
      <Layout>
        <SideMenu></SideMenu>
        <Layout className="site-layout">
          <TopHeader></TopHeader>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280
            }}
          >
            <Switch>
              {/* home路由 */}
              <Route path="/home" component={Home} />
              <Route path="/user-manage/users" component={Users} />
              <Route path="/right-manage" component={Manage} />
              <Route path="/article-manage/list" component={List} />
              <Route path="/article-manage/category" component={Category} />
              <Redirect from="/" to="/home" exact />
              <Route path="*" component={Error} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
