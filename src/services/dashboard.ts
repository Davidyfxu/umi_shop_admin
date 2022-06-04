import request from '@/utils/request';

/**
 * 获取统计面板数据
 */
export function fetchDashboard() {
  return request('/admin/index');
}
