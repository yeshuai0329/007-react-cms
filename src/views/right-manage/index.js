import React, { Component } from 'react'
import { Route, Redirect, Switch, NavLink } from 'react-router-dom'
import Right from './Right.js'
import Roles from './Roles.js'
export default class Index extends Component {
  render() {
    return (
      <div>
        <div style={{ margin: '10px' }}>
          <NavLink
            to="/right-manage/roles"
            style={{ marginRight: '20px', color: '#ccc' }}
          >
            角色列表
          </NavLink>
          <NavLink
            to="/right-manage/rights"
            style={{ marginRight: '20px', color: '#ccc' }}
          >
            权限列表
          </NavLink>
        </div>
        <hr />
        <div style={{ margin: '10px' }}>
          <Switch>
            <Route path="/right-manage/roles" component={Roles}></Route>
            <Route path="/right-manage/rights" component={Right}></Route>
            <Redirect from="/right-manage" to="/right-manage/roles"></Redirect>
          </Switch>
        </div>
      </div>
    )
  }
}
