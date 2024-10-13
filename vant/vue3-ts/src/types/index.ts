export interface IGoods {
  title: string
  price: number
  express: string
  remain: number
  thumb: string[]
}

export interface CardGoods {
  id: string
  title: string
  price: number
  desc: string
  num: number
  thumb: string
}

/**
 * 商品
 */
export interface Product {
  amount: number; // 金额
  brandName: string; //品牌
  couponRemainQuantity: number; // 优惠券剩余数量
  couponStartTime: number; // 优惠券开始时间（时间戳）
  couponTotalQuantity: number; // 优惠券总数量
  createAt: Date | null; // 创建时间
  descTxt: string; // 描述文本
  couponDiscount: number; //优惠卷 ？
  extraCouponAmount: number; // 额外优惠券金额
  goodsDesc: string; // 商品描述
  goodsImageUrl: string; // 商品图片URL
  goodsLabels: string[]; // 商品标签
  goodsName: string; // 商品名称
  goodsSign: string; // 商品标识
  goodsThumbnailUrl: string; // 商品缩略图URL
  hasCoupon: boolean; // 是否有优惠券
  hasMallCoupon: boolean; // 是否有商城优惠券
  hasMaterial: boolean; // 是否有材料
  isMultiGroup: boolean; // 是否多组商品
  lgstTxt: string; // 物流相关文本
  mallCouponDiscountPct: number; // 商城优惠券折扣百分比
  mallCouponEndTime: number; // 商城优惠券结束时间
  mallCouponId: number; // 商城优惠券ID
  mallCouponMaxDiscountAmount: number; // 商城优惠券最大折扣金额
  mallCouponMinOrderAmount: number; // 商城优惠券最小订单金额
  mallCouponRemainQuantity: number; // 商城优惠券剩余数量
  mallCouponStartTime: number; // 商城优惠券开始时间
  mallCouponTotalQuantity: number; // 商城优惠券总数量
  mallCps: number; // 商城佣金比例
  mallId: number; // 商城ID
  mallName: string; // 商城名称
  merchantType: number; // 商家类型
  minGroupPrice: number; // 最低团购价
  minNormalPrice: number; // 最低正常价
  onlySceneAuth: boolean; // 仅场景授权
  optId: number; // 选项ID
  optIds: number[]; // 选项ID数组
  optName: string; // 选项名称
  planType: number; // 计划类型
  predictPromotionRate: number; // 预测促销率
  promotionRate: number; // 促销率
  salesTip: string; // 销售提示
  searchId: string; // 搜索ID
  servTxt: string; // 服务相关文本
  serviceTags: number[]; // 服务标签ID数组
  shareRate: number; // 分享率
  subsidyAmount: number | null; // 补贴金额
  subsidyDuoAmountTenMillion: number | null; // 补贴数量，单位为百万
  subsidyGoodsType: number; // 补贴商品类型
  unifiedTags: string[]; // 统一标签
  zsDuoId: number; // 资源双ID
}
/**
 商品详情
 */
export interface ProductDetails {
  activityPromotionRate: number | null;
  activityTags: number[];
  brandName: string;
  cashGiftAmount: number | null;
  catId: number;
  catIds: number[];
  cltCpnBatchSn: string;
  cltCpnDiscount: number | null;
  cltCpnEndTime: number | null;
  cltCpnMinAmt: number | null;
  cltCpnQuantity: number | null;
  cltCpnRemainQuantity: number | null;
  cltCpnStartTime: number | null;
  couponDiscount: number;
  couponEndTime: number;
  couponMinOrderAmount: number;
  couponRemainQuantity: number;
  couponStartTime: number;
  couponTotalQuantity: number;
  createAt: string | null;
  descTxt: string;
  extraCouponAmount: number;
  goodsDesc: string;
  goodsGalleryUrls: string[];
  goodsImageUrl: string;
  goodsName: string;
  goodsSign: string;
  goodsThumbnailUrl: string;
  hasCoupon: boolean;
  hasMallCoupon: boolean;
  isMultiGroup: boolean;
  lgstTxt: string;
  mallCouponDiscountPct: number;
  mallCouponEndTime: number;
  mallCouponMaxDiscountAmount: number;
  mallCouponMinOrderAmount: number;
  mallCouponRemainQuantity: number;
  mallCouponStartTime: number;
  mallCouponTotalQuantity: number;
  mallCps: number;
  mallId: number;
  mallImgUrl: string;
  mallName: string;
  materialList: any[];  // Assuming no specific structure provided
  merchantType: number;
  minGroupPrice: number;
  minNormalPrice: number;
  onlySceneAuth: boolean;
  optId: number;
  optIds: number[];
  optName: string;
  planType: number;
  predictPromotionRate: number;
  promotionRate: number;
  salesTip: string;
  servTxt: string;
  serviceTags: number[];
  shareRate: number;
  skuList: any[];  // Assuming no specific structure provided
  subsidyAmount: number | null;
  subsidyDuoAmountTenMillion: number | null;
  subsidyGoodsType: number;
  unifiedTags: string[];
  videoUrls: string[];
  zsDuoId: number;
}