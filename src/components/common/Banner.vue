<template>
  <div class="top_banner">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image,index) in list" :key="index">
        <img :src="image.ImageUrl" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  var comsrc = "http://www.murangj.cn/"; //域名路径
  var presrc = comsrc + "phonejk/"; //前端所有接口地址
  var presrc1 = presrc + "scjk.aspx/";
  var picurl = comsrc + "Upload/";
  var url = presrc + "GetAdv.ashx";
  //alert(picurl)

    export default {
      components: {
      },
      data () {
        return {
          list:[],
        }
      },
      mounted(){
        this.getBan();
      },
      methods:{
        getBan() {
          let _this = this;
          this.$axios
            .request({
              url: url,
              methods: "GET"
            })
            .then(function(ret) {
              var dataObj = ret.data;
              _this.list = dataObj.list;
              console.log(dataObj);
              for (var i = 0; i < _this.list.length; i++) {
                _this.list[i].ImageUrl = picurl + _this.list[i].ImageUrl;
              }
            })
            .catch(function(ret) {});
        }
        }
    }
</script>

<style scoped>
  .top_banner{width:7.5rem; height:4rem; overflow:hidden; position:relative;margin-top: 0.8rem;}
  .my-swipe .van-swipe-item {width: 7.5rem;height: 4rem;}
  .my-swipe .van-swipe-item img {width: 100%;height: 100%;
}
</style>