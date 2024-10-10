<template>
  <div id="app">
    <div style="padding-bottom: 50px">
      <router-view />
    </div>


    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="wap-home-o"></van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">搜索商品</van-tabbar-item>
      <van-tabbar-item replace to="/ddk" icon="search">多多查</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-circle-o">用户</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
