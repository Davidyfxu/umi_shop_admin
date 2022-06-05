import type { Effect, Reducer } from 'umi';

import { queryCurrent } from '@/services/user';

export type CurrentUser = {
  id?: number;
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    /**
     * 获取当前登录用户数据
     * @param _
     * @param call
     * @param put
     */
    *fetchCurrent(_, { call, put }) {
      // 看localStorage有无用户信息，没有再请求
      let userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

      if (!userInfo) {
        userInfo = yield call(queryCurrent);
        // 判断是否获取到用户信息
        if (!userInfo.id) {
          // 把用户信息存入localstorage
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
      }

      const response = yield call(queryCurrent);

      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};

export default UserModel;
