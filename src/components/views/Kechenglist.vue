<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="课程分类">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">

        <Banner></Banner>

        <div class="swiper-containernav">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" v-for="(item,index) in listtab" :id="item.PkId" :class="isIndex==index?'active':''" @click="tab(index,$event)">
                    <router-link :to="{path:'/Kechenglist',query: {id: item.PkId}}">{{item.Name}}</router-link>
                </li>
            </ul>
        </div>

        <ul class="kc_sort fix">
            <li v-for="(item,index) in kcsort" :sorts="index" :class="issortindex==index?'active':''" @click="tabsort(index)">{{item}}</li>
        </ul>

        <div class="fix">
            <div class="kclistbox">
              <ul class="kcul">
                    <li v-for="item in list" :id="item.PkId">
                        <div class="kctop">
                            <div class="kcleft"><a><img :src="`http://www.murangj.cn/Upload/sc/procat/`+items.ImageUrl"></a></div>
                              <div class="kcright">
                                  <h1><a>{{item.Title}}</a></h1>
                                  <h2><span>{{item.Price}}</span><i>|</i><span>食品从业人员</span><i>|</i><span>共23课时</span></h2>
                                  <p>人民法治网讯（王红云  通讯员 杨莹莹）为贯彻落实 “保障千家万户舌尖上的安度，保障广大人民群众春节期间食品安全。近日，陵水县检察院充分发挥检察机检查专项活动。...</p>
                              </div>
                        </div>
                        <div class="kcbot">
                          <span class="left">可购买时间：2019-04-11  至  2019-04-31</span>
                            <em class="right">¥<i>499.00</i></em>
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
          isIndex:0,
          listtab:[],
          list:[],
          Newslist:[],
          issortindex:0,
          kcsort:['综合','销量','新品','价格↑','价格↓'],
        }
      },
      components: {
        Header,Banner,Footer
      },
      mounted(){

        var mySwiper = new Swiper('.swiper-containernav', {
          freeMode: true,
          freeModeMomentumRatio: 0.5,
          slidesPerView: 'auto',
        });

        this.getmuli();
        this.productlist();
      },
      methods:{
        
        getmuli(){
              let _this = this;
              this.$axios.request({
                    url: presrc + "GetCaseCatAll.ashx",
                    methods: "GET"
               }).then(function(ret) {
                var dataObj = ret.data;
                _this.listtab = dataObj.list;
                // _this.listdlist = dataObj.list[0].dlist;
                // for(var i=0;i<_this.listtab.list.length;i++){
                //   _this.listdlist = dataObj.list[i].dlist;
                // }
                })
                .catch(function(ret) {
              }); 
          },
          productlist(){
                this.catid = this.$route.query.catid;//产品分类Id
                this.n = 1;     //第几次加载
                this.sorts = 0; //排序类型
                this.size = 4; //每次加载条数
                console.log(this.catid)
                this.$axios.get(presrc+"/GetCaseTop.ashx",{
                  params:{
                    catid:this.$route.query.catid,
                    n:1,
                    sorts:0,
                    size:4
                  }
                }).then(res=>{
                  console.log(res.data)
                  this.list=res.list;
                })
                .catch(function(res) {
              }); 
            },
            tab(index,name){
                this.isIndex = index;
                // console.log(name.target.innerText)
                //  this.listtab.forEach(item =>{
                //     if(item.Name === name.target.innerText){
                //         this.listdlist = item.dlist;
                //     }
                //  })
            },
            tabsort(index){
              this.issortindex = index;
            },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;padding-bottom: 70px;}
  .kc_sort{height: 30px;line-height: 30px;margin-top: 5px;}
  .kc_sort li{width: 20%;float:left;text-align: center;}
  .kc_sort li.active{color: #0064ff;}
  @import '../../assets/css/swiper.min.css'
</style>
