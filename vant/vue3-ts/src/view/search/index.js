import { get, post } from '@/utils/request'
// 多多进宝商品查询：pdd.ddk.goods.search
export const getGoodsSearchApi = p => get('sgin/ddk/goods/search/', p);

//export const updateStautsApi = p => post('sgin/signUp/web/updateStatus', p);