import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  password: string;
};

/**
 * 执行登录，获取token
 * @param data
 */
export async function fakeAccountLogin(data: LoginParamsType) {
  return request('/auth/login', {
    method: 'POST',
    data,
  });
}

/**
 * 退出登录
 */
export async function logout() {
  return request.post('/auth/logout');
}
