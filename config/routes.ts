export default [
  // {
  //   path: '/',
  //   redirect: '/user/login',
  // },
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [

          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/index',
              },
              {
                path: '/index',
                name: '首页',
                icon: 'home',
                component: './index',
              },{
                path: '/chat',
                name: '在线聊天',
                icon: 'smile',
                component: './Chat/index',
              },{
                path: '/friends',
                name: '我的好友',
                icon: 'user',
                component: './Friends/index',
              },{
                path: '/info',
                name: '个人中心',
                icon: 'star',
                component: './Info/index',
              },
              {
                path: '/admin',
                name: '管理',
                icon: 'tool',
                authority: ['admin'],
                component: './Admin/index',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
