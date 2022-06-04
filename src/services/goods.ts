import request from '@/utils/request';

/**
 * 获取商品列表
 */
export async function getGoods(params: any): Promise<any> {
  return request('/admin/goods', { params });
}

/**
 * 上架和下架商品
 * @param goodsId 商品id
 */
export async function isOn(goodsId: number) {
  return request.patch(`/admin/goods/${goodsId}/on`);
}
/**
 * 推荐与不推荐商品
 * @param goodsId 商品id
 */
export async function isRecommend(goodsId: number) {
  return request.patch(`/admin/goods/${goodsId}/recommend`);
}

// /**
//  * 添加用户
//  */
// export async function addUser(params: CreateUserType) {
//   return request.post('/admin/users', { params });
// }
//
// /**
//  * 更新用户
//  */
// export async function updateUser(editId: number, data: UpdateUserType) {
//   return request.put(`/admin/users/${editId}`, { data });
// }
//
// /**
//  * 用户详情
//  */
// export async function showUser(editId: number) {
//   return request.get(`/admin/users/${editId}`);
// }
