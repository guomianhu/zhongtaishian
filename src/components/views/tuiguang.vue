<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="我的推广">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="tuiguang">
            <h1>我是 奥特曼 向您推荐此应用</h1>
            <h2><img src="../../assets/images/ewm.png"></h2>
            <h3>开班啦!</h3>
            <h4>视频从业人员  食品安全管理员</h4>
            <h5>分享此图给您的伙伴们，产生订单即可赚取佣金<br>坐在家里也可以收取佣金啦！</h5>
            <ul class="tgbtn fix">
                <li><a href="#">保存图片</a></li>
                <li><a href="#">点击分享</a></li>
            </ul>
            <div class="tgbot">
                <div class="tgbottit"><span>关于中泰食安</span></div>
                <p>据《纽约时报》8日报道，当地时间7日，俄罗斯科研机构副所长提洪
    诺娃（Katerina Tkhonova）接受电视访问，介绍她的团队正在研发
    一种能阅读脑波的设备。 虽然普京从未公开承认自己的小女儿与这位
    科学家的关系，但 他曾说过“我的女儿正致力于科学领域发展”，而
    这两人的名字中刚好 也都有卡捷琳娜（Katerina）。加之提洪诺娃的
    外表也与普京极像，因此 不少俄罗斯和西方媒体都认为提洪诺娃就是
    普京的小女儿。</p>
            </div>
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
          
        }
      },
      components: {
        Header,Footer
      },
      mounted(){
        
      },
      methods:{
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;background: #fff;}
  .ussrtop{padding-bottom: 30px;}
  .ksbtn{height: 1.2rem;line-height: 1.2rem; z-index: 9999;}
</style>
