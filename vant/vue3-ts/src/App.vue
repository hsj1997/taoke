<template>
  <div id="app">
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="wap-home-o">建设中</van-tabbar-item>
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
