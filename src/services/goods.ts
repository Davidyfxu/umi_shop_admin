import request from '@/utils/request';
import { GoodsAddType, GoodsItem } from '@/pages/types';

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

/**
 * 添加商品
 */
export async function addGoods(data: GoodsAddType) {
  return request.post('/admin/goods', { data });
}

/**
 * 更新商品
 */
export async function updateGoods(editId: number, data: any) {
  return request.put(`/admin/goods/${editId}`, { data });
}

/**
 * 商品详情
 */
export async function showGoods(editId: number) {
  return request.get(`/admin/goods/${editId}?include=category`);
}
