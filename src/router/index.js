/* eslint-disable prettier/prettier */
import Vue from 'vue';
import VueRouter from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import NotFound from '../views/404';

Vue.use(VueRouter);

const routes = [
  // 登陆注册
  {
    path: '/user',
    // component: { render: h => h('router-view') }, // 使用函数式的方式提供占位符
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ '../layouts/UserLayout.vue'),
    children: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/User/Login'),
      },
      {
        path: 'register',
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
          icon: 'dashboard',
          title: '仪表盘',
        },
        component: { render: h => h('router-view') },
        children: [
          {
            path: 'analysis',
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
        path: 'form',
        name: 'form',
        meta: {
          icon: 'form',
          title: '表单',
        },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/form',
            redirect: '/form/basic-form',
          },
          {
            path: 'basic-form',
            name: 'basicform',
            meta: { title: '基础表单' },
            component: () =>
              import(
                /* webpackChunkName: "form" */ '../views/Form/BasicForm.vue'
              ),
          },
          {
            path: 'step-form',
            name: 'stepform',
            hideChildrenInMenu: true,
            meta: { title: '分布表单' },
            component: () =>
              import(/* webpackChunkName: 'form */ '../views/Form/StepForm'),
            children: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: 'info',
                name: 'info',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '../views/Form/StepForm/Step1'
                  ),
              },
              {
                path: 'confirm',
                name: 'confirm',
                component: () =>
                  import(
                    /* webpackChunkName: 'form */ '../views/Form/StepForm/Step2'
                  ),
              },
              {
                path: 'result',
                name: 'result',
                component: () =>
                  import(
                    /* webpackChunkName: 'form */ '../views/Form/StepForm/Step3'
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
    hideInMenu: true,
    name: '404',
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
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
