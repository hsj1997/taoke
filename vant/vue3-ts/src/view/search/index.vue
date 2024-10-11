<template>
    <div>

        <van-back-top right="15vw" bottom="10vh" class="custom"></van-back-top>
        <van-sticky>
            <van-search
                v-model="searchValue"
                show-action
                label="商品"
                placeholder="请输入搜索商品关键词"
                @search="onSearch"
        >
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search>
        </van-sticky>
        <div></div>
        <div>
            <van-list
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="全部加载完成"
                    @load="onLoad"
            >
                <van-cell v-for="item in goodsList" :key="item" @click="toDetail(item.goodsSign)" >

                    <div class="product-item">
                        <div class="item-container">
                            <div style="display: flex;flex-grow: 1;">
                                <van-image
                                        width="34rem"
                                        height="10rem"
                                        fit="cover"
                                        :src="item.goodsThumbnailUrl || item.goodsImageUrl"
                                        class="item-image"
                                />
                                <div class="item-details">
                                    <p class="item-name">{{ item.goodsName }}</p>
                                    <div style="display: flex;justify-content:start">
                                    <span style="margin-right: 10px">品牌</span>
                                        <van-tag
                                                size=""
                                                color="#7232dd"
                                                style="margin-right: 5px"
                                        >
                                            {{ item.brandName }}
                                        </van-tag>
                                    </div>

                                </div>
                            </div>

                            <!--fit="contain"-->
                            <div class="item-details">
                                <div style="display:flex;justify-content:start" class="tags">
                                    <van-tag
                                            v-for="unifiedTagsItem in item.unifiedTags"
                                            :key="unifiedTagsItem"
                                            color="#7232dd"
                                            class="tag"
                                            style="margin-right: 5px"
                                    >
                                        {{ unifiedTagsItem }}
                                    </van-tag>
                                </div>
                                <div style="display: flex;justify-content:space-between">
                                <p class="item-price">
                                    当前团购价: <span class="current-price">¥{{ convertToYuan(item.minGroupPrice) }}</span>
                                    <s class="original-price">原价: ¥{{ convertToYuan(item.minNormalPrice) }}</s>
                                </p>
                                </div>
                                <div style="display: flex;justify-content:space-between">
                                <p class="item-coupons">
                                    优惠券: <span class="current-price">¥{{ convertToYuan(item.couponDiscount) }}</span> |
                                    额外优惠券: <span class="current-price">¥{{ convertToYuan(item.extraCouponAmount) }}</span>
                                </p>
                                </div>
                                <div style="display: flex;justify-content:space-between">
                                    <p class="final-price">
                                        卷后价: <span class="final-price-value">¥{{ convertToYuan(item.minGroupPrice - item.couponDiscount) }}</span>
                                    </p>
                                    <p class="item-sales"> 销售量: {{ item.salesTip }}</p>

                                </div>

                            </div>
                        </div>

                    </div>

                </van-cell>
            </van-list>

        </div>
    </div>
</template>

<script lang="ts" setup>
  import router from '@/router';
  import { ref,getCurrentInstance } from 'vue';
  import { getGoodsSearchApi } from '@/view/search/index.js';
  import { showNotify } from 'vant';
  import { Product } from '@/types';

  const { proxy } = getCurrentInstance();
  const convertToYuan = (item:number) => {
    return proxy.$publicFunc.convertToYuan(item);
  };

  const searchValue = ref<string>('');
  const listId = ref<string>('');
  const searchId = ref<string>('');
  const goodsList = ref<Product[]>([]);
  const totalCount = ref(100);
  const pageSize = ref(20);
  const pageNum = ref(1);

  const loading = ref<boolean>(false);
  const finished = ref<boolean>(false);
  const onLoad = () => {
    // 异步更新数据
    // 加载状态结束
    console.log("执行")
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        pageNum.value++;
        onSearch('-1');
  };
  //搜索
  const onSearch = (val = '') => {

    loading.value = true;

    if(val != '-1'){
      goodsList.value = [];
      totalCount.value = 100;
      listId.value = '';
      pageNum.value = 1;
    }
    const param = {
      listId: listId.value,
      keyword: searchValue.value,
      page:pageNum.value,
      pageSize:pageSize.value,
    }
    getGoodsSearchApi(param).then((res: any) => {
      console.log(res)
      goodsList.value = goodsList.value.concat(res.data.goodsList);
      totalCount.value = res.data.totalCount;
      listId.value = res.data.listId;
      searchId.value = res.data.searchId;

      //加载结束
      loading.value = false;
      // 数据全部加载完成
      if ((pageNum.value * pageSize.value + pageSize.value) >= totalCount.value) {
        finished.value = true;
      }

    })
  }
  //详情
  const toDetail = (item:string) => {
    //获取当前详情
    router.push({name:'goodsDetails',query:{searchId:searchId.value,goodsSign:item}});
  }
</script>

<style  lang="scss" scoped>

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
        font-size: 1.1rem;
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