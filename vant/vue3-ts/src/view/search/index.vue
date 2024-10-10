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
                <van-cell v-for="item in goodsList" :key="item" >

                    <div class="product-item">
                        <!--<van-image   width="10rem"
                                     height="10rem"
                                     fit="contain"
                                     :src="" :alt="item.goodsName">-->

                        <van-image
                                width="10rem"
                                height="10rem"
                                fit="contain"
                                :src="item.goodsThumbnailUrl || item.goodsImageUrl" />
                        <h2>{{item.goodsName}}</h2>
                        <h4>{{item.goodsDesc}}</h4>
                        <p>品牌: {{item.brandName}}</p>
                        <p>当前团购价: <span style="color: red;">¥{{item.minGroupPrice}}</span> <s>原价: ¥{{item.minNormalPrice}}</s></p>
                        <p>优惠券: ¥{{item.couponDiscount}} 额外优惠券: ¥{{item.extraCouponAmount}}</p>

                        <van-tag v-for="unifiedTagsItem in item.unifiedTags"
                                 :key="item"
                                 color="#7232dd"
                                    style="margin-right: 5px">{{unifiedTagsItem}}</van-tag>
                        <p>销售量: {{item.salesTip}}</p>
                    </div>

                </van-cell>
            </van-list>

        </div>
    </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { getGoodsSearchApi } from '@/view/search/index.js';
  import { showNotify } from 'vant';
  import { Product } from '@/types';

  const searchValue = ref<string>('');
  const listId = ref<string>('');
  const goodsList = ref<Product[]>([]);
  const totalCount = ref(100);
  const pageSize = ref(10);
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

      //加载结束
      loading.value = false;
      // 数据全部加载完成
      if ((pageNum.value * pageSize.value + pageSize.value) >= totalCount.value) {
        finished.value = true;
      }

    })
  }

</script>

<style  lang="scss" scoped>
    .custom {
        width: 100px;
        font-size: 14px;

    }
</style>