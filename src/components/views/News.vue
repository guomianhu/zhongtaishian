<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="新闻中心">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="swiper-containernav">
            <ul class="swiper-wrapper">
                <li @click="cur=0" :class="{active:cur==0}">公司新闻</li>
                <li @click="cur=1" :class="{active:cur==1}">行业新闻</li>
                <li @click="cur=2" :class="{active:cur==2}">食品资讯</li>
            </ul>
        </div>
        <div class="newswhite">
            <ul class="newslilist" v-show="cur==0">
                <li v-for="(item,index) in Newslist" :key="index" @click="linktoshow(item)">
                    <h1>{{item.title}}</h1>
                    <h2><span>{{item.passtime}}</span><em>浏览次数：{{item.views}}次</em><em class="right">{{item.publishedAt}}</em></h2>
                    <p>{{item.desc}}</p>
                </li>
            </ul>
            <ul class="newslilist" v-show="cur==1">
                <li v-for="(item,index) in Newslist2" :key="index" @click="linktoshow(item)">
                    <h1>{{item.title}}</h1>
                    <h2><span>{{item.passtime}}</span><em>浏览次数：{{item.views}}次</em><em class="right">{{item.publishedAt}}</em></h2>
                    <p>{{item.desc}}</p>
                </li>
            </ul>
            <ul class="newslilist" v-show="cur==2">
                <li v-for="(item,index) in Newslist3" :key="index" @click="linktoshow(item)">
                    <h1>{{item.title}}</h1>
                    <h2><span>{{item.passtime}}</span><em>浏览次数：{{item.views}}次</em><em class="right">{{item.publishedAt}}</em></h2>
                    <p>{{item.desc}}</p>
                </li>
            </ul>
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

    export default {
      data () {
        return {
          Newslist:[],
          Newslist2:[],
          Newslist3:[],
          cur:0,
        }
      },
      components: {
        Header,
        Footer
      },
      mounted(){

        var mySwiper = new Swiper('.swiper-containernav', {
          freeMode: true,
          freeModeMomentumRatio: 0.5,
          slidesPerView: 'auto',
        });

        this.getindexnews();
        this.getindexnews2();
        this.getindexnews3();
        
      },
      methods:{
        getindexnews() {
          this.$axios.get('https://gank.io/api/v2/random/category/Girl/type/Girl/count/10').then(res => {
              console.log(res.data.data)
              this.Newslist = res.data.data;
            })
            .catch(function(res) {});
        },
        getindexnews2() {
          this.$axios.get('https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/6').then(res => {
              console.log(res.data.data)
              this.Newslist2 = res.data.data;
            })
            .catch(function(res) {});
        },
        getindexnews3() {
          this.$axios.get('https://gank.io/api/v2/random/category/GanHuo/type/Android/count/4').then(res => {
              console.log(res.data.data)
              this.Newslist3 = res.data.data;
            })
            .catch(function(res) {});
        },
        linktoshow(item){
            this.$router.push({
                path: '/Newsshow',
                name: 'Newsshow',
                params:{
                    title: item.title,
                    passtime: item.createdAt,
                    images: item.images,
                    author: item.author,
                    desc: item.desc,
                }
            })
        },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .newslilist li h2 em{margin-left: 0;}
  .newslilist li p{color: #333;}
  @import '../../assets/css/swiper.min.css'
</style>
