import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);

      if (response.status === undefined) {
        // 提醒登录成功
        message.success('登录成功').then((r) => r);

        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        // 跳转首页
        history.replace('/');
      }
    },

    *logout(_: any, { call }: any) {
      // loading
      const load = message.loading('退出中...');

      // 请求api，退出登录
      // @ts-ignore
      const response = yield call(logout);

      // 判断是否登录成功
      if (!response.status) {
        // 删除本地存储的token和userInfo
        localStorage.removeItem('access_token');
        localStorage.removeItem('userInfo');
        message.success('退出成功').then((r) => r);

        // 重定向
        history.replace('/login');
      }

      load();
    },
  },

  reducers: {
    changeLoginStatus(state: any, { payload }: any) {
      // 将token存入localStorage
      localStorage.setItem('access_token', payload.access_token);
      return {
        ...state,
      };
    },
  },
};

export default Model;
