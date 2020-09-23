<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="我的证书">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="adpadding">
            <ul class="zhshulist fix">
                <li v-for="(item,key) in zslist" v-if="key<4">
                    <h1><img :src="item.coverImageUrl"></h1>
                    <h3>{{item.title}}</h3>
                    <h4>
                      <span class="left">类型：{{item.type}}</span>
                      <em><a href="#"><p>下载</p></a></em>
                    </h4>
                </li>
            </ul>
        </div>
    </div>

    <!--底部-->
    <Footer></Footer>

  </div>
</template>

<script>

  import Header from "../common/Header"
  import Footer from "../common/Footer"

  export default {
      data () {
        return {
          zslist:[],
        }
      },
      components: {
        Header,Footer
      },
      mounted(){
        this.getzslist();
      },
      methods:{
          getzslist() {
            this.$axios.get('https://gank.io/api/v2/categories/GanHuo').then(res => {
                console.log(res.data.data)
                this.zslist = res.data.data;
              })
              .catch(function(res) {});
          },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .zhshulist li h1{height: 3.4rem;}
</style>
