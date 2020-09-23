<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="生活馆"></Header>

    <!--banner轮播-->
    <div class="top_banner">
      <div class="swiper-container">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" v-for="(item,index) in getindexbanner" :key="index"><img :src="item.img_url"></li>
            </ul>
            <div class="swiper-pagination"></div>
        </div>
    </div>

    <ul class="indexiocn fix">
        <router-link to="/jigou" tag="li"><h1><a></a></h1><p><a>关于我们</a></p></router-link>
        <router-link to="/Kecheng" tag="li"><h1><a></a></h1><p><a>课程中心</a></p></router-link>
        <router-link to="/news" tag="li"><h1><a></a></h1><p><a>政策宣传</a></p></router-link>
        <router-link to="/zhengshucx" tag="li"><h1><a></a></h1><p><a>证书查询</a></p></router-link>
        <router-link to="/tuiguang" tag="li"><h1><a></a></h1><p><a>我的推广</a></p></router-link>
        <router-link to="/teacher" tag="li"><h1><a></a></h1><p><a>师资团队</a></p></router-link>
        <router-link to="/kaoshi" tag="li"><h1><a></a></h1><p><a>在线考试</a></p></router-link>
        <router-link to="xuexijl" tag="li"><h1><a></a></h1><p><a>学习指南</a></p></router-link>
    </ul>

    <div class="adpadding mtop20">
        <div class="pb_newtit"><i></i>活动广告</div>
        <Carousel class="mtop20 adbanner" autoplay v-model="value2" loop>
          <CarouselItem v-for="item in adbanner">
            <div class="demo-carousel">
              <img :src="item.image" />
            </div>
          </CarouselItem>
        </Carousel>
    </div>

    <div class="adpadding">
        <div class="pb_newtit"><i></i>学习中心<router-link to="/Kecheng">更多课程<b>></b></router-link></div>
        <ul class="index_piclist fix">
            <li v-for="(item,index) in indexkc.slice(0,6)" :key="index">
                <router-link :to="{path:'/video', query: {id:index,PkId:item.views}}">
                    <div class="picimg"><img :src="item.images"></div>
                    <div class="pictxt">{{item.desc}}</div>
                    <div class="kc_price">￥{{item.views}}.00<em>共<i>{{item.title.slice(1,3)}}</i>节</em></div>
                </router-link>
            </li>
        </ul>
    </div>

    <div class="adpadding mtop20">
        <div class="pb_newtit"><i></i>师资团队<router-link to="/teacher">更多导师<b>></b></router-link></div>
        <ul class="index_szlist fix">
            <li v-for="(item,index) in indexteacher.slice(0,4)" :key="index" @click="linktoshow(item)">
                <div class="szpicimg"><img :src="item.images"></div>
                <div class="sztxt">
                    <h1>{{item.author}}</h1>
                    <h2>{{item.desc}}</h2>
                    <h3>{{item.title}}</h3>
                </div>
            </li>
        </ul>
    </div>

    <div class="adpadding mtop20">
        <div class="pb_newtit"><i></i>信息资讯<router-link to="/news">更多资讯<b>></b></router-link></div>
        <div class="pb_newpic fix" v-for="(item,index) in Newslist.slice(1,2)" :key="index">
            <a @click="linktoshow(item)">
                <div class="nw_img"><img src="https://ae01.alicdn.com/kf/U9ad1211a7bc24ac2b6d3a8dcad37dc403.jpg"></div>
                <div class="nw_txt">
                    <h2><router-link to="/newsshow">{{item.title}}</router-link></h2>
                    <p>毕业于西北农林科技大学果树学专业，获博士学位，毕业后一直工作于陕西师范大学食品工程与营养科学学院食品工程与营养科学学院 ...</p>
                </div>
            </a>
        </div>
        <ul class="news_li">
            <li v-for="(item,index) in Newslist.slice(2,8)" :key="index"><i>■</i><a @click="linktoshow(item)">{{item.desc}}</a></li>
        </ul>
    </div>

    <!--底部-->
    <Footer></Footer>

  </div>
</template>

<script>
  import '../assets/js/jquery.min.js'
  import '../assets/js/swiper.min.js'
  import Header from "../components/common/Header"
  import Footer from "../components/common/Footer"

    export default {
      components: {
        Header,
        Footer
      },
      props:{},
      name: "home",
      data () {
        return {
          value2: 0,
          getindexbanner:[],
          adbanner:[],
          Newslist:[],
          indexkc:[],
          indexteacher:[],
          result:[],
        }
      },
      mounted(){
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            spaceBetween: 5,
            autoplay : 3000,
            observer:true,
            observeParents:false
        });
        this.getBan();
        this.getadlist();
        this.getindexnews();
        this.getkclist();
        this.getteacherlist();
        var path = this.$route.path;
        //alert(path)
        if(path == '/Home'){
            this.goback = false;
        }
      },
      methods:{
        getBan(){
          this.$axios.get(baseURL+"/api/ad").then(res=>{
            this.getindexbanner=res.data.data;
          })
        },
        getadlist() {
          this.$axios.get(baseURL2+"/home/multidata").then(res => {
              this.adbanner = res.data.data.banner.list;
            })
            .catch(function(res) {});
        },
        getkclist() {
          this.$axios.get('https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/10').then(res => {
              this.indexkc = res.data.data;
            })
            .catch(function(res) {});
        },
        getteacherlist() {
          this.$axios.get('https://gank.io/api/v2/data/category/GanHuo/type/Android/page/1/count/10').then(res => {
              this.indexteacher = res.data.data;
            })
            .catch(function(res) {});
        },
        getindexnews() {
          this.$axios.get('https://gank.io/api/v2/random/category/GanHuo/type/Android/count/10').then(res => {
              console.log(res.data.data)
              this.Newslist = res.data.data;
            })
            .catch(function(res) {});
        },
        linktoshow(item){
            let params = {
                title: item.title,
                passtime: item.createdAt,
                image: item.images,
                author: item.author,
                desc: item.desc
            }
            this.$router.push({
                path: '/Newsshow',
                name: 'Newsshow',
                params:params
            })
        }
      },
      watch:{
          $route(to,from){
            alert(to.path);
          }
        },
    }
</script>

<style scoped>
  .mainbox{padding-bottom:70px;}
  .top_banner{width:7.5rem; height:4rem; overflow:hidden; position:relative;margin-top: 0.8rem;}
  .top_banner .swiper-container{width:7.5rem; height:4rem; overflow:hidden}
  .top_banner .swiper-container .swiper-slide{width: 101%;height: 100%;}
  .top_banner .swiper-container .swiper-slide img{width:100%;height:100%;}
  .adbanne .demo-carousel{ height:6rem!important; overflow:hidden;}
  .adbanner img{width: 100%;height: 100%;}
  .nw_txt h2,.sztxt h1{white-space: nowrap;text-overflow: ellipsis;overflow:hidden;}
  .index_piclist li{width: 3.45rem;}
  .nw_img img,.szpicimg img{border:1px solid #eee;}
  .pictxt{height: 0.8rem;}
  @import '../assets/css/swiper.min.css'
</style>
