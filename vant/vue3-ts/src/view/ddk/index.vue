<template>




  <van-notice-bar color="#1989fa" background="#ecf9ff"
          left-icon="volume-o"
          text="通过转换链接后才能查询优惠"
  />

  <div>
    <div style="height: 10px;background-color: #f8f8f8"></div>
    <van-cell-group inset>
      <van-field
              v-model="url"
              label="待转换链接"
              label-align="top"
              rows="10"
              autosize
              type="textarea"
              maxlength="500"
              placeholder="请输入待转换链接"
              show-word-limit
      />
    </van-cell-group>
  </div>
  <div class="leftandRightborders">
    <van-row gutter="10">
      <van-col span="18">
        <van-button :loading="loading" type="primary" size="large" @click="queryButton" loading-text="转换查询中">转换查询</van-button>
      </van-col>
      <!--<van-col span="1"></van-col>-->
      <van-col span="6">
        <van-button type="danger" size="large" @click="clear">清除</van-button>
      </van-col>
    </van-row>
    <p>链接: {{ genUrl }}</p>

    <van-row gutter="10">
      <van-col span="18">
        <van-button :disabled="!genUrl || genUrl === ''" size="large" :url="genUrl" color="linear-gradient(to right, #ff7e5f, #feb47b)">
          一键直达
        </van-button>
      </van-col>
      <!--<van-col span="1"></van-col>-->
      <van-col span="6">
        <van-button :disabled="!genUrl || genUrl === ''" type="primary" size="large" @click="copyText">复制地址</van-button>
      </van-col>
    </van-row>


  </div>

</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { getUrlGenApi } from '@/view/ddk/index.js';
  import { showFailToast,showNotify } from 'vant';
  const url = ref<string>('');
  const genUrl = ref<string>('');
  const clear = () => {
    url.value = '';
    genUrl.value = '';
    loading.value = false;
  };

  const loading = ref<boolean>(false);
  //查询按钮
  const queryButton=(e = '')=>{
    if(!url.value){
      showFailToast({ message:'请输入链接',position: 'top'});
      return false;
    }
    loading.value = true
    let param ={
      url:url.value
    }
    getUrlGenApi(param).then((res: any)=>{
      console.log(res)
      if(res.code !== 200){
        showFailToast({ message:res.msg,position: 'top'});
      }else{
        genUrl.value = res.data;
      }
      loading.value = false
    })
  };
  //复制
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(genUrl.value);
      showNotify({ type: 'success', message: '复制成功' });
    } catch (err) {
      console.warn('clipboard API 不可用，使用 execCommand 方法');
      copyToClipboard(genUrl.value); // 使用 execCommand 方法
      //showNotify({ type: 'danger', message: '复制失败' });
    } finally {
      //showNotify({ type: 'success', message: '复制成功' });
    }
  };
  function copyToClipboard(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showNotify({ type: 'success', message: '复制成功' });
  }
</script>

<style lang="scss" scoped>

  .leftandRightborders{
    margin: var(--van-cell-group-inset-padding);
  }

::v-deep .van-field__body{
  background-color: #f8f8f8;
  border-radius: 8px;
}
</style>
