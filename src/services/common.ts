import request from '@/utils/request';

/**
 * 获取oss上传签名
 */
export function ossConfig() {
  return request('/auth/oss/token');
}
