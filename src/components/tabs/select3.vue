
<template>  
  <div class="jifencot" slot='select03'>
  		<div class="jdtit">
            <h1>中泰食品安全培训网（机构）</h1>
            <h3>hengzhinuo Enterprise Management Co., Ltd</h3>
        </div>
        <div class="map" id="map"></div>
        
        <div class="jdcont">
            <h2 v-if="sysInfo.web_address">{{sysInfo.web_address.title}}：{{sysInfo.web_address.data}}</h2>
            <h2 v-if="sysInfo.web_tel">{{sysInfo.web_tel.title}}：{{sysInfo.web_tel.data}}</h2>
            <h2 v-if="sysInfo.web_qq">{{sysInfo.web_qq.title}}：{{sysInfo.web_qq.data}}</h2>
            <h2 v-if="sysInfo.web_email">{{sysInfo.web_email.title}}：{{sysInfo.web_email.data}}</h2>
        </div>
        <div class="contactewm">
            <img src="../../assets/images/ewm.jpg">
            <p>关注微信公众号</p>
        </div>
  </div>  
</template> 

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmView from 'vue-baidu-map/components/map/MapView.vue'
  import Header from "../common/Header"
  import Footer from "../common/Footer"

    export default {
      data () {
        return {
          sysInfo:[],
          zoom: 12.8,
          addressKeyword: "",
        }
      },
      components: {
        Header,Footer,BaiduMap,BmView
      },
      mounted(){
        this.getLocationPoint();
        this.getSysInfo();
      },
      methods:{
          getSysInfo(){
              this.$axios.get(baseURL+"/api/sysinfo").then(res=>{
              this.sysInfo=res.data.data;
            })
          },
        getLocationPoint() {
            var map = new BMap.Map("map");    // 创建Map实例
            map.centerAndZoom(new BMap.Point(108.954424,34.319378), 15);  // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            map.addControl(new BMap.MapTypeControl({
              mapTypes:[
                BMAP_NORMAL_MAP,
                BMAP_HYBRID_MAP
              ]}));
            map.setCurrentCity("西安");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

            var point = new BMap.Point(108.954424,34.319378);
            map.centerAndZoom(point, 10);
            var marker = new BMap.Marker(point);        // 创建标注
            marker.setTitle("西安市凤城二路市利君V时代B座");
            map.addOverlay(marker);                     // 将标注添加到地图中
            // 设置标注动画效果。如果参数为null，则取消动画效果。该方法需要在addOverlay方法后设置
            marker.setAnimation(Animation);
        }
      }
    }
</script>

<style scoped>
  .jifencot{margin-top: 20px;}
</style>
