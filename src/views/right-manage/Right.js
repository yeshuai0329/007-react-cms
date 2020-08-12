import React, { Component } from 'react'
import { Table, Tag } from 'antd'
import axios from 'axios'
export default class Right extends Component {
  state = {
    datalist: []
  }
  columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <b>{id}</b>,
      align: 'center'
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
      align: 'center'
    },
    {
      title: '权限等级',
      dataIndex: 'grade',
      key: 'grade',
      render: (grade) => {
        let arr = ['orange', 'green', 'red']
        return <Tag color={arr[grade - 1]}>{grade}</Tag>
      },
      align: 'center'
    }
  ]
  render() {
    return <Table columns={this.columns} dataSource={this.state.datalist} />
  }
  componentDidMount() {
    axios.get('http://localhost:8080/rights').then((res) =>
      this.setState({
        datalist: res.data
      })
    )
  }
}
