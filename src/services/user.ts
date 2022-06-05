import request from '@/utils/request';
import { CreateUserType, UpdateUserType } from '@/pages/types';

/**
 * 获取当前登录的用户信息
 */
export async function queryCurrent(): Promise<any> {
  return request('/admin/user');
}

/**
 * 获取用户列表
 */
export async function getUsers(params: {
  name?: string;
  email?: string;
  phone?: number;
}): Promise<any> {
  return request('/admin/users', { params });
}

/**
 * 禁用与启用用户
 * @param uid 用户id
 */
export async function lockUser(uid: number) {
  return request.patch(`/admin/users/${uid}/lock`);
}

/**
 * 添加用户
 */
export async function addUser(data: CreateUserType) {
  return request.post('/admin/users', { data });
}

/**
 * 更新用户
 */
export async function updateUser(editId: number, data: UpdateUserType) {
  return request.put(`/admin/users/${editId}`, { data });
}

/**
 * 用户详情
 */
export async function showUser(editId: number) {
  return request.get(`/admin/users/${editId}`);
}
