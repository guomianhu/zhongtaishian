<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="我的课程">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">

        <Banner></Banner>

        <div class="swiper-containernav">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" :class="{'active':class_true}" @click="allkc"><a>全部课程</a></li>
                <li class="swiper-slide" v-for="(item,index) in listtab" :id="item.PkId" :class="isIndex==index?'active':''" @click="tab(index,$event)">
                    <router-link :to="{path:'/Kecheng',query: {id: item.PkId}}">{{item.Name}}</router-link>
                </li>
            </ul>
        </div>

        <div class="fix">
            <div class="kclistbox">
              <ul class="kcul">
                    <li v-for="(items,index) in listdlist" :id="items.PkId">
                        <div class="kctop">
                            <div class="kcleft"><router-link :to="{path:'/video',query: {PkId:items.PkId,id:index}}"><img :src="`http://www.murangj.cn/Upload/sc/procat/`+items.ImageUrl"></router-link></div>
                              <div class="kcright">
                                  <h1><router-link :to="{path:'/video',query: {PkId:items.PkId,id:index}}">{{items.Name}}</router-link></h1>
                                  <h2><span>{{items.IsFirst}}</span><i>|</i><span>食品从业人员</span><i>|</i><span>共{{items.PkId.replace(/[^0-9]/ig,"").slice(2,4)}}课时</span></h2>
                                  <p>人民法治网讯（王红云  通讯员 杨莹莹）为贯彻落实 “保障千家万户舌尖上的安度，保障广大人民群众春节期间食品安全。近日，陵水县检察院充分发挥检察机检查专项活动。...</p>
                              </div>
                        </div>
                        <div class="kcbot">
                          <span class="left">可购买时间：2019-04-11  至  2019-04-31</span>
                            <em class="right">¥<i>{{items.PkId.replace(/[^0-9]/ig,"").slice(2,5)}}</i></em>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>

    <!--底部-->
    <Footer></Footer>

  </div>
</template>

<script>
  import '../../assets/js/jquery.min.js'
  import '../../assets/js/swiper.min.js'
  import Header from "../common/Header"
  import Footer from "../common/Footer"
  import Banner from "../common/Banner"

  var comsrc = "http://www.murangj.cn/";//域名路径 
  var presrc = comsrc + "phonejk/";  //前端所有接口地址
  var picurl = comsrc + 'Upload/sc/procat/';

  export default {
      data () {
        return {
          isIndex:null,
          class_true:true,
          listtab:[],
          listdlist:[],
        }
      },
      components: {
        Header,Footer,Banner
      },
      mounted(){

        var mySwiper = new Swiper('.swiper-containernav', {
          freeMode: true,
          freeModeMomentumRatio: 0.5,
          slidesPerView: 'auto',
        });

        this.getmuli();
        
      },
      methods:{
        getmuli(){
            let _this = this;
            this.$axios.request({
                  url: presrc + "GetCaseCatAll.ashx",
                  methods: "GET"
             }).then(function(ret) {
              var dataObj = ret.data;
              console.log(dataObj)
              _this.listtab = dataObj.list;
              _this.listdlist = dataObj.list[0].dlist;
              for(var i=0;i<_this.listtab.list.length;i++){
                _this.listdlist = dataObj.list[i].dlist;
              }
              })
              .catch(function(ret) {
            }); 
        },
        tab(index,name){
            this.isIndex = index;
            this.class_true = false;
            console.log(name.target.innerText)
             this.listtab.forEach(item =>{
                if(item.Name === name.target.innerText){
                    this.listdlist = item.dlist;
                }
             })
         },
         allkc(){
            this.class_true = true;
            this.isIndex=null;
            this.$router.go(0)
            this.$router.push({ path: "/Kecheng", query:{activeIndex:1}});
         },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;padding-bottom: 70px;}
  @import '../../assets/css/swiper.min.css'
</style>
