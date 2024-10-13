import { get, post } from '@/utils/request'
// 多多进宝推广链接生成：pdd.ddk.goods.promotion.url.generate
export const getGoodsPromotionUrlGenerateApi = p => get('sgin/ddk/goods/promotion/url/generate', p);
// 详情
export const getGoodsDetailApi = p => get('sgin/ddk/goods/detail', p);