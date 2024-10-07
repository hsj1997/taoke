import { get, post } from '@/utils/request'
// 单品推广转链：pdd.ddk.goods.zs.unit.url.gen
export const getUrlGenApi = p => get('sgin/ddk/goods/zs/unit/url/gen', p);

//export const updateStautsApi = p => post('sgin/signUp/web/updateStatus', p);