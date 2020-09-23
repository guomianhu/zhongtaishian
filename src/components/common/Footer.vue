<template>
    <!-- <div class="bottom-tab">
    <div class="tab-item" @click="switchTo('/')">
        <img :src="'/' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal">
        <span :class="{active: '/' === $route.path}">首页</span>
    </div>
    <div class="tab-item" @click="switchTo('/Search')">
        <img :src="'/Search' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal">
        <span :class="{active: '/Search' === $route.path}">目的地</span>
    </div>
    <div class="tab-item" @click="switchTo('/dingzhi')">
        <img :src="'/dingzhi' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal">
        <span :class="{active: '/dingzhi' === $route.path}">定制</span>
    </div>
    <div class="tab-item" @click="switchTo('/order')">
        <img :src="'/order' === $route.path ? tabBarImgArr[3].selected : tabBarImgArr[3].normal">
        <span :class="{active: '/order' === $route.path}">订单</span>
    </div>
    <div class="tab-item" @click="switchTo('/me')">
        <img :src="'/me' === $route.path ? tabBarImgArr[4].selected : tabBarImgArr[4].normal">
        <span :class="{active: '/me' === $route.path}">我的</span>
    </div>
  </div> -->
    <div class="bottom-tab">
        <div class="tab-item" v-for="(item, index) in tabBarImgArr" :key="index" @click="switchTo(item.path)">
            <img :src="item.path === $route.path ? tabBarImgArr[index].selected : tabBarImgArr[index].normal">
            <span :class="{active: item.path === $route.path}">{{item.name}}</span>
            <div class="cartnum" :value="quantity" v-if="showcartnum">{{cartlength}}</div>
        </div>
    </div>
</template>

<script>

  export default {
    data() {
      return {
        showcartnum:false,
        cartlength:0,
        tabBarImgArr: [
          {normal: require('../../assets/images/fico1.png'), selected: require('../../assets/images/fico1a.png'),name: "首页",path: "/Home"},
          {normal: require('../../assets/images/fico2.png'), selected: require('../../assets/images/fico2a.png'),name: "课程",path: "/Kecheng"},
          {normal: require('../../assets/images/fico3.png'), selected: require('../../assets/images/fico3a.png'),name: "考试",path: "/exam"},
          {normal: require('../../assets/images/cart.png'), selected: require('../../assets/images/cart2.png'),name: "购物车",path: "/cart"},
          {normal: require('../../assets/images/fico4.png'), selected: require('../../assets/images/fico4a.png'),name: "我的",path: "/Me"},
        ]
      };
    },

    methods: {
      switchTo(path){
        this.$router.replace(path)
        console.log(this.$route.path)
      }
    }
  }
</script>

<style scoped>
.bottom-tab{ width:7.5rem;height:60px;background-color: #fff;position:fixed;left:0;bottom:0;right: 0;margin: auto; display:flex;z-index:999;-webkit-box-shadow:2px 2px 5px #666; box-shadow:2px 2px 5px #666;}
.tab-item{display:flex;flex:1;flex-direction:column;align-items:center;justify-content:center;font-size:14px;color:#666;position: relative;}
.tab-item img{width:24px;height: 24px; margin-bottom:2px;}
.active{color:#4da7f3;}
.tab-item:nth-child(1) .cartnum,.tab-item:nth-child(2) .cartnum,.tab-item:nth-child(3) .cartnum,.tab-item:nth-child(5) .cartnum{display: none;}
.cartnum{width: 22px;height: 22px;line-height: 22px; text-align: center; background: #D24161;border-radius: 50%;position: absolute;top: 5px;right:12px;color: #fff;}
</style>
