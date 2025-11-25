//对外暴露配置路由（常量路由）
export const constantRoute = [
  {
    // 登录
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',// 设置菜单标题
      hidden: true, // 设置该路由在菜单中是否隐藏
    }
  },
  {
    //登录成功以后展示数据的路由
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'layout',// 设置菜单标题
      hidden: true,
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',// 设置菜单标题
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',// 设置菜单标题
      hidden: true,
    }
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',// 设置菜单标题
      hidden: false,
      icon: 'Platform',
    },
  },
]

//异步路由
export const asyncRoute = [
  {
    path: '/acl',
    name: 'Acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',// 设置菜单标题
      hidden: false,
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        name: 'User',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',// 设置菜单标题
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        name: 'Role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',// 设置菜单标题
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',// 设置菜单标题
          hidden: false,
          icon: 'Monitor',
        }
      },
    ]
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '商品管理',// 设置菜单标题
      hidden: false,
      icon: 'ShoppingCartFull',
    },
    children: [
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',// 设置菜单标题
          hidden: false,
          icon: 'Goods',
        },
      },
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',// 设置菜单标题
          hidden: false,
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',// 设置菜单标题
          hidden: false,
          icon: 'Grid',
        }
      },
      {
        path: '/product/sku',
        name: 'Sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',// 设置菜单标题
          hidden: false,
          icon: 'Grid',
        }
      },
    ]
  },
]
//任意路由
export const anyRoute = {
    path: '/:pathMatch(.*)*',
    name: 'Any',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '任意路由',// 设置菜单标题
      hidden: true,
    }
  }