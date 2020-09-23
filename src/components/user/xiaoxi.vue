<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="我的消息">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="xiaoxibox">
        <ul class="news_li">
            <li v-for="(item,index) in Newslist" :key="index" @click="linktoshow(item._id,index)"><i>■</i>{{item.desc}}</li>
        </ul>
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
          Newslist:[],
        }
      },
      components: {
        Header,
        Footer
      },
      mounted(){
        this.getindexnews();
        // this.GetRequest();
        // this.getSubjectId()
      },
      methods:{
        getindexnews() {
          this.$axios.get('https://gank.io/api/v2/random/category/Girl/type/Girl/count/8').then(res => {
              console.log(res.data.data)
              this.Newslist = res.data.data;
            })
            .catch(function(res) {});
        },

        linktoshow(movieId,index){
            this.$router.push({
                path: '/xiaoxishow/'+movieId,
                // query:{
                //     id:item._id,
                //     title: item.title,
                //     passtime: item.createdAt,
                //     images: item.images,
                //     author: item.author,
                //     desc: item.desc 
                // }
            })
        },

        // GetRequest() {   
        //     var url = location.search;  
        //     var theRequest = new Object();   
        //     if (url.indexOf("?") != -1) {   
        //        var str = url.substr(1);   //获取url中"?"符后的字串  
        //        strs = str.split("&");   
        //        for(var i = 0; i < strs.length; i ++) {   
        //            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);  
        //        }   
        //     }   
        //     return theRequest;   
        // },  

        // getSubjectId(){
        //     const self = this;
        //     var pamrs =  self.GetRequest();
        //     self.suject_id = pamrs.id
        //     console.log('getSubjectId',self.suject_id);
        // },

      }
    }
</script>

<style scoped>
  .xiaoxibox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
</style>
