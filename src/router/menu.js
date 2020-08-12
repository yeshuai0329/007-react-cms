import {
  EditOutlined,
  CopyOutlined,
  ScissorOutlined,
  DeleteOutlined
} from '@ant-design/icons'

const MenuArr = [
  {
    title: '首页',
    icon: EditOutlined,
    permission: 1, //权限字段
    path: '/home' //路径跳转
  },
  {
    title: '用户管理',
    icon: CopyOutlined,
    permission: 3,
    path: '/user-manage',
    children: [
      {
        title: '用户列表',
        icon: CopyOutlined,
        path: '/user-manage/users',
        permission: 3
      }
    ]
  },
  {
    title: '权限管理',
    permission: 3,
    path: '/right-manage',
    icon: ScissorOutlined,
    children: [
      {
        title: '角色列表',
        icon: ScissorOutlined,
        path: '/right-manage/roles',
        permission: 3
      },
      {
        title: '权限列表',
        icon: ScissorOutlined,
        path: '/right-manage/rights',
        permission: 3
      }
    ]
  },
  {
    title: '文章管理',
    icon: DeleteOutlined,
    path: '/article-manage',
    permission: 1,
    children: [
      {
        title: '文章列表',
        icon: DeleteOutlined,
        path: '/article-manage/list',
        permission: 1
      },
      {
        title: '文章分类',
        icon: DeleteOutlined,
        path: '/article-manage/category',
        permission: 2
      }
    ]
  }
]

export default MenuArr
