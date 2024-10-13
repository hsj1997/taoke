<template>
  <div id="app">
    <div style="padding-bottom: 50px">
      <!--<keep-alive include="search">
        <router-view :key="route.name"></router-view>
      </keep-alive>-->
      <router-view  v-slot="{ Component, route }">
            <keep-alive :include="includeList" >
              <component  :is="Component" :key="route.name" />
            </keep-alive>
       <!-- {{route.name}}-->
      </router-view>
      <!--<router-view v-slot="{ Component,route }">
        <keep-alive :include="includeList">
          <component :is="Component" :key="route.name"/>
        </keep-alive>
      </router-view>-->
    </div>

    <van-tabbar route v-show="show">
      <van-tabbar-item replace to="home" icon="wap-home-o"></van-tabbar-item>
      <van-tabbar-item replace to="search" icon="search">搜索商品</van-tabbar-item>
      <van-tabbar-item replace to="ddk" icon="search">多多查</van-tabbar-item>
      <van-tabbar-item replace to="user" icon="user-circle-o">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts" name="app" setup>
  import { onActivated,onDeactivated,computed, ref,next} from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const includeList = ref(['search2']); // 确保组件名称正确 是组件文件的名字

  const show = computed(() => {
    return route.name === 'home' ||
            route.name === 'user' ||
            route.name === 'search' ||
            route.name === 'ddk';
  });



  onActivated(() => {
    // called on initial mount
    // and every time it is re-inserted from the cache

    console.log('onActivated')
  })

  onDeactivated(() => {
    // called when removed from the DOM into the cache
    // and also when unmounted

    console.log('onDeactivated')
  })
</script>

<style>
  body {
    font-size: 16px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
  }
</style>