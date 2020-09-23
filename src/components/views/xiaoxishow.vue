<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="文章详情">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="adpadding mtop30 newsxq" name="xiaoxishow">
        <div class="jdtit">
            <h1>{{title}}</h1>
            <h3>发布时间：{{createdAt}}<span>作者：{{author}}</span></h3>
        </div>
        <div class="newsimg"><img :src="images"></div>
        <div class="jdcont">
            <p>{{content}}</p>
            <p>40年砥砺奋进，40年三湘巨变。今天上午，湖南省庆祝改革开放 0周年大会在长沙举行，回顾总结改革开放走过的光辉历程、取得 巨大成就、积累的宝贵经验，深入分析改革开放面临的形势任务， 进一步动员全省上下深入学习贯彻习近平新时代中国特色社会主义 思想和党的十九大精神，在更高起点、更高层次、更高目标上把改 革开放不断推向深入。省委书记杜家毫在会上发表讲话。省委副书 记、省长许达哲主持，省政协主席李微微出席。</p>
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
      name:'xiaoxishow',
      props:{
        "movieId":String
      },
      data () {
        return {
          content:'',
          title:'',createdAt:'',author:'',images:''
        }
      },
      components: {Header,Footer},
      mounted(){
        this.getcontent();
        //this.getParams();
        this.getindexnews();
      },
      methods:{
        // getParams(){
        //     this.title = this.$utils.getUrlKey("desc")
        //     this.passtime = this.$utils.getUrlKey("passtime")
        //     this.author = this.$utils.getUrlKey("author")
        //     this.images = this.$utils.getUrlKey("image")
        // },
        getcontent(){
            this.$axios.get('https://gank.io/api/v2/post/5e777432b8ea09cade05263f').then(res=>{
            this.content=res.data.data.content;
          })
        },
        getindexnews() {
          var id = this.movieId
          //alert(id)
          this.$axios.get('https://gank.io/api/v2/random/category/Girl/type/Girl/count/8').then(res => {
              var res = res.data.data;
              console.log(res)
              for(var i=0;i<res.length;i++){
                this.title = res[i].desc
                this.createdAt = res[i].createdAt
                this.author = res[i].author
                this.images = res[i].images
              }
            })
            .catch(function(res) {});
        },
      },
      watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
      }
    }
</script>

<style scoped>
  .adpadding{margin-top: 0.8rem;margin-bottom:60px;}
  .newsimg{text-align: center;}
  .newsimg img{margin-top: 15px;}
  .jdcont{margin-top: 10px;}
  .newsimg img{text-align: center;vertical-align: middle;max-width:100%;}
</style>
