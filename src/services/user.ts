import request from '@/utils/request';

/**
 * 获取当前登录的用户信息
 */
export async function queryCurrent(): Promise<any> {
  return request('/admin/user');
}
