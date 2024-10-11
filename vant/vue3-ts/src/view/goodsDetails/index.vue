<template>
    <div>
        详情
        {{searchId}}
        {{goodsSign}}
    </div>
</template>

<script lang="ts" setup>
  import { onMounted,ref } from 'vue';
  import {useRoute} from 'vue-router'

  const route = useRoute()

  const searchId = ref<string>('');
  const goodsSign = ref<string>('');

  onMounted(() => {
    searchId.value = route.query.searchId;
    goodsSign.value = route.query.goodsSign;
  })
</script>

<style lang="scss"  scoped>

</style>