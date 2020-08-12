import React, { Component } from 'react'
import {
  BrowserRouter, //history 模式路由
  Route, //路由，
  Redirect, //重定向
  Switch
} from 'react-router-dom'
import Login from '../views/login/Login.js'

import DashBoard from '../views/dashboard/DashBoard.js'
//hash 模式路由 <HashRouter></HashRouter>
// history  模式路由  <BrowserRouter></BrowserRouter>
export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/"
            render={() =>
              localStorage.getItem('token') ? (
                <DashBoard />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </BrowserRouter>
    )
  }
}
