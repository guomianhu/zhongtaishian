<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="文章详情">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="adpadding mtop30 newsxq">
        <div class="jdtit">
            <h1>{{title}}</h1>
            <h3>发布时间：{{passtime}}<span>作者：{{author}}</span></h3>
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
      data () {
        return {
          title:'',
          passtime:'',
          author:'',
          images:'',
          content:'',
        }
      },
      components: {Header,Footer},
      mounted(){
        this.getcontent();
        //this.getParams();
        this.$nextTick(function () {
            //获取传递的参数
            this.title = this.$route.params.desc
            this.passtime = this.$route.params.passtime
            this.author = this.$route.params.author
            this.images = this.$route.params.image
        })
        //alert(decodeURIComponent(this.getQueryString('id')))
      },
      methods:{
        // getParams(){
        //     this.title = this.$route.params.desc
        //     this.passtime = this.$route.params.passtime
        //     this.author = this.$route.params.author
        //     this.img = this.$route.params.images
        // },
        getcontent(){
            this.$axios.get('https://gank.io/api/v2/post/5e777432b8ea09cade05263f').then(res=>{
            this.content=res.data.data.content;
          })
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
