<template>
    <van-sticky>
    <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    /></van-sticky>
    <div>
        <!--详情
        {{searchId}}
        {{goodsSign}}-->
        <van-swipe height="500px" :autoplay="9000" lazy-render>
            <van-swipe-item v-for="image in swipeUrls" :key="image">
                <van-image
                        fit=""
                        width="100vw"
                        height="50vh"
                        :src="image"
                        class="item-image"
                />
            </van-swipe-item>
        </van-swipe>

        <!--<div style="width: 10px"></div>-->
        <div style="background-color: white;padding: 10px">
            <div style="margin: 10px;">
            <div style=""><!--display: flex;justify-content:space-between-->

                <p class="item-price">
                    当前卷后价: <span class="current-price">¥{{ convertToYuan(detail?.minGroupPrice - detail?.couponDiscount) }}</span>
                    <s class="original-price">原拼团价: ¥{{ convertToYuan(detail?.minGroupPrice) }}</s>
                </p>
                <p class="final-price">
                    优惠卷: <span class="final-price-value">¥{{ convertToYuan(detail?.couponDiscount) }}</span>

                    <van-tag
                            color="#7232dd"
                            class="tag"
                            style="margin-right: 5px"
                    >
                        剩余: {{detail?.couponRemainQuantity}}
                    </van-tag>
                </p>
                <p class="item-sales"> 销售量: {{ detail?.salesTip }}</p>
                <van-tag
                        v-for="unifiedTagsItem in detail?.unifiedTags"
                        :key="unifiedTagsItem"
                        color="#7232dd"
                        class="tag"
                        style="margin-right: 5px"
                >
                    {{ unifiedTagsItem }}
                </van-tag>

                <p class="item-name">{{ detail?.goodsName }}</p>
                <div style="display: flex;justify-content:start">
                    <span style="margin-right: 10px">品牌</span>
                    <van-tag
                            size=""
                            color="#7232dd"
                            style="margin-right: 5px"
                    >
                        {{ detail?.brandName }}
                    </van-tag>
                </div>
            </div>
        </div>
        </div>
        <div style="background-color: #f8f8f8;height: 10px;width: 100%"></div>
        <div style="background-color: white;padding: 10px">
            <van-cell>

                <div class="">
                    <div class="item-container">
                        <div style="display: flex;flex-grow: 1;">
                            <van-image
                                    width="4rem"
                                    height="4rem"
                                    fit="cover"
                                    :src="detail?.mallImgUrl"
                                    class="item-image"
                            />
                            <div class="item-details">
                                <p class="item-name">{{ detail?.mallName }}</p>
                            </div>
                            <!-- {{detail?.merchantType}}-->
                        </div>

                        <!--fit="contain"-->
                        <div style="margin-top: 6px"></div>
                        <div class="item-details">

                                <div class="item-price">
                                    <div style="display: flex;justify-content:space-between">
                                        <div>描述相符 <span style="color: red">{{detail?.descTxt}}</span></div>
                                        <div>物流服务 <span style="color: red">{{detail?.lgstTxt}}</span></div>
                                        <div>服务态度 <span style="color: red">{{detail?.servTxt}}</span></div>
                                    </div>
                                </div>

                        </div>
                    </div>

                </div>

            </van-cell>
        </div>
        <div style="background-color: #f8f8f8;height: 10px;width: 100%"></div>
        <div style="background-color: white;padding: 10px">
            <div class="item-price">视频详情</div>
            <div v-for="videoUrl in detail?.videoUrls" :key="videoUrl">
                <video width="100%" height="300px" controls>
                    <source :src="videoUrl" type="video/mp4">
                    <source :src="videoUrl" type="video/webm">
                    Your browser does not support the video tag.
                </video>
            </div>

        </div>
    </div>
    <van-action-bar>
        <!--<van-action-bar-icon icon="chat-o" text="" />
        <van-action-bar-icon icon="shop-o" text="" />-->
        <!--<van-action-bar-button color="#be99ff" type="warning" text="" />-->
        <van-action-bar-button color="#7232dd" type="danger" text="一键直达" @click="oneClickPurchase"/>
    </van-action-bar>
</template>

<script lang="ts" setup>
  import { getCurrentInstance, onMounted, ref } from 'vue';
  import {useRoute} from 'vue-router'

  import { getGoodsDetailApi,getGoodsPromotionUrlGenerateApi } from '@/view/goodsDetails/index.js';

  import { ProductDetails } from '@/types';

  const route = useRoute()

  const { proxy } = getCurrentInstance();
  const convertToYuan = (item:number) => {
    return proxy.$publicFunc.convertToYuan(item);
  };

  const searchId = ref<string>('');
  const goodsSign = ref<string>('');
  const detail = ref<ProductDetails>();
  const swipeUrls = ref([]);
  const listId = ref(null);

  const shopTypes = ref([
    { id: 1, name: '个人' },
    { id: 2, name: '企业' },
    { id: 3, name: '旗舰店' },
    { id: 4, name: '专卖店' },
    { id: 5, name: '专营店' },
    { id: 6, name: '普通店' },
    { id: 0, name: '全部' }  // 为未传的情况提供全部选项
  ]);
  const onClickLeft = () => history.back();
  const images = ref([
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  ]);

  onMounted(() => {
    searchId.value = route.query.searchId;
    goodsSign.value = route.query.goodsSign;
    //详情
    getDetail();
  })

  //搜索
  const getDetail = (val = '') => {

    const param = {
      searchId:searchId.value,
      goodsSign: goodsSign.value,
    }
    getGoodsDetailApi(param).then((res: any) => {
      console.log(res)
      detail.value = res.data;
      swipeUrls.value = res.data.goodsGalleryUrls;
      //listId.value = res.data.listId;
      //searchId.value = res.data.searchId;
    })

  }
  const oneClickPurchase = (val = '') => {
    const param = {
      goodsSignList:detail.value.goodsSign,
      searchId:searchId.value
    }
    getGoodsPromotionUrlGenerateApi(param).then((res: any) => {
      console.log(res)
      // 跳转到下单页
      window.location.href = res.data;
    })
  }
</script>

<style lang="scss"  scoped>
    .custom {
        width: 100px;
        font-size: 14px;

    }
    .product-item{
        border: 0px solid red;
    }

    .item-container {
        /*display: flex;*/
        padding: 1rem;
        border: 1px solid #eaeaea;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        margin: 0rem 0;
        background-color: #fff;
    }
    .item-image {
        border-radius: 8px;
        margin-right: 1rem;
    }
    .item-details {
        flex-grow: 1; /* Fill the remaining space */
    }
    .item-name {
        text-align: left;
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
        color: #333;
    }
    .item-price,
    .item-coupons,
    .final-price,
    .item-sales {
        margin: 0rem 0;
        font-size: 1rem;
        color: #666;
    }
    .current-price {
        color: red;
        font-weight: bold;
        font-size: 2rem;
    }
    .original-price {
        color: #999;
        text-decoration: line-through;
        margin-left: 0.5rem;
    }
    .final-price-value {
        color: red;
        font-weight: bold;
        font-size: 1.1rem;
    }
    .tags {
        margin-top: 0.5rem;
    }
    .tag {
        margin-right: 5px;
    }
</style>