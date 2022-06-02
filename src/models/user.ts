import type { Effect, Reducer } from 'umi';

import { queryCurrent, query as queryUsers } from '@/services/user';

export type CurrentUser = {
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
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    /**
     * 获取当前登录用户数据
     * @param _
     * @param call
     * @param put
     */
    *fetchCurrent(_, { call, put }) {
      // 看localStorage有无用户信息
      // let userInfo;
      // let userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
      //
      // if (!userInfo) {
      //   userInfo = yield call(queryCurrent);
      //   // 判断是否获取到用户信息
      //   if (userInfo.id !== undefined) {
      //     // 把用户信息存入localstorage
      //     localStorage.setItem('userInfo', JSON.stringify(userInfo));
      //   }
      // }

      const response = yield call(queryCurrent);
      console.log('response222', response);

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
