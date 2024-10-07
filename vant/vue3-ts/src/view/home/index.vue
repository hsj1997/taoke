<template>

  <div>
    <img style="width: 100%;object-fit: cover;overflow: hidden;height: 600px;" src="../../assets/建设.png" />


  </div>

</template>

<script lang="ts" setup>
  import { ref } from 'vue';


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
