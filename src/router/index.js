/* eslint-disable no-empty */
/* eslint-disable prettier/prettier */
import Vue from 'vue';
import VueRouter from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import findLast from 'lodash/findLast';

import { notification } from 'ant-design-vue';

import { check, isLogin } from '../utils/auth';

import NotFound from '../views/404';
import Forbidden from '../views/403';

Vue.use(VueRouter);

const routes = [
  // 登陆注册
  {
    path: '/user',
    // component: { render: h => h('router-view') }, // 使用函数式的方式提供占位符
    hideInMenu: true, // 用来配合生成菜单信息的
    component: () =>
      import(/* webpackChunkName: "layout" */ '../layouts/UserLayout.vue'),
    children: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/User/Login'),
      },
      {
        path: '/user/register',
        name: 'register',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/User/Register'),
      },
    ],
  },
  // 首页
  {
    // 仪表盘
    path: '/',
    meta: { authority: ['user', 'admin'] },
    component: () =>
      import(/* webpackChunkName: "layout" */ '../layouts/BasicLayout.vue'),
    children: [
      {
        path: '/',
        redirect: '/dashboard/analysis',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          icon: 'dashboard', // 和菜单配合时需要渲染出来的图标type
          title: '仪表盘', // 和菜单渲染配合时显示的文字
        },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: { title: '分析页' },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '../views/Dashboard/Analysis.vue'
              ),
          },
        ],
      },
      // form
      {
        path: '/form',
        name: 'form',
        meta: {
          icon: 'form',
          title: '表单',
          authority: ['admin'], // 这个数组表示进入到当前及子页面所需要的角色级别
        },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/form',
            redirect: '/form/basic-form',
          },
          {
            path: '/form/basic-form',
            name: 'basicform',
            meta: { title: '基础表单' },
            component: () =>
              import(
                /* webpackChunkName: "form" */ '../views/Form/BasicForm.vue'
              ),
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            hideChildrenInMenu: true,
            meta: { title: '分布表单' },
            component: () =>
              import(/* webpackChunkName: "form" */ '../views/Form/StepForm'),
            children: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '../views/Form/StepForm/Step1'
                  ),
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '../views/Form/StepForm/Step2'
                  ),
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '../views/Form/StepForm/Step3'
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/403', // 无权限
    name: '403',
    hideInMenu: true,
    component: Forbidden,
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  // 找到最近的一个带有 authority 信息的路由
  // matched 返回的是一个数组，带有当前路由极其父级路由信息
  // const record = to.matched.find(record => record.meta.authority);
  const record = findLast(to.matched, record => record.meta.authority);

  // 判断是否有权限
  if (record && !check(record.meta.authority)) {
    // 判断是否登录
    // 当当前的角色是 guest 时，isLogin 会返回 false
    // to.name !== 'login' 的判断是为了避免可能出现的栈溢出，也就是一直跳到登录页
    if (!isLogin() && to.name !== 'login') {
      next({
        name: 'login',
      });
    } else if (to.name !== '403') {
      // 已登录，即当前角色不是 guest，例如为 user
      // 没有权限
      notification.error({
        message: '403',
        description: '您没有权限，请联系管理员。',
      });
      next({
        name: '403',
      });
    }
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
