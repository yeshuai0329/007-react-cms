import React, { Component } from 'react'
import { Table, Button, Tag } from 'antd'
import axios from 'axios'

export default class Roles extends Component {
  state = {
    datalist: []
  }
  columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '操作',
      key: 'action',
      render: (obj) => {
        return (
          <Button
            danger
            type="primary"
            onClick={() => {
              this.delHandler(obj.id)
            }}
          >
            Delate
          </Button>
        )
      },
      align: 'center'
    }
  ]
  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.datalist}
        rowKey={(item) => item.id}
        expandable={{
          expandedRowRender: (record) => {
            return record.roleRight.map((item, index) => (
              <div key={index}>
                <b style={{}}>{item.category}：</b>
                {item.list.map((it) => (
                  <span key={it}>
                    <Tag color="green" style={{ margin: '10px' }}>
                      {it}
                    </Tag>
                  </span>
                ))}
              </div>
            ))
          }
        }}
      />
    )
  }
  componentDidMount() {
    axios.get('http://localhost:8080/roles').then((res) => {
      this.setState({
        datalist: res.data
      })
    })
  }
  delHandler = (id) => {
    var arr = this.state.datalist.filter((item) => {
      return item.id !== id
    })
    console.log(arr)
    this.setState({
      datalist: [...arr]
    })
    axios
      .delete(`http://localhost:8080/roles/${id}`)
      .then((res) => console.log(res))
  }
}
