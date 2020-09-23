<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="课程管理">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="adpadding">
            <ul class="kcglli">
                  <li v-for="(item,index) in Newslist" :key="index">
                      <span class="left"><router-link :to="{path: '/video', query: {id:index,PkId:item.views}}">{{item.desc}}</router-link></span>
                      <em>¥<i>{{item.views}}</i></em>
                  </li>
              </ul>
              <v-pagination
                  :total="total"
                  :current="current"
                  :pageSize="pageSize"
                  @getPageSize="getPageSize"
                  @jump="jump">
              </v-pagination>
        </div>
    </div>

    <!--底部-->
    <Footer></Footer>

  </div>
</template>

<script>

  import Header from "../common/Header"
  import Footer from "../common/Footer"
  import page from "../common/page"

  export default {
      data () {
        return {
          Newslist:[],
          total:20,
          current:1,
          pageSize:25
        }
      },
      components: {
        Header,Footer,
        'v-pagination': page,
      },
      mounted(){
        this.getindexnews();
      },
      methods:{
         getindexnews() {
            let url = `https://gank.io/api/v2/random/category/Girl/type/Girl/count/${this.total}`
            this.$axios.get(url).then(res => {
                console.log(res.data.data)
                this.Newslist = res.data.data;
              })
              .catch(function(res) {});
          },
          jump(index){
            this.current=index;
          },
          getPageSize(pageSize){
              this.pageSize=pageSize;
          },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .kcglli li:last-child{border-bottom: 0; }
</style>
