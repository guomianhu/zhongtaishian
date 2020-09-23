<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="奖励记录">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="xiaoxibox">
        <div class="zhanghu"><span>账户余额</span><em>500.00</em></div>
        <div class="sharetit"><i></i>奖励明细</div>
        <div class="adpadding">
            <ul class="shareli zhanghuli">
                <li>
                    <div class="sharlef">
                        <h2>奖励记录类型一</h2>
                        <h3>分享用户名<i>|</i>2019-04-21 15:30</h3>
                    </div>
                    <div class="sharight">+  50</div>
                </li>
                <li>
                    <div class="sharlef">
                        <h2>分享记录一</h2>
                        <h3>分享用户名<i>|</i>2019-04-21 15:30</h3>
                    </div>
                    <div class="sharight">+  50</div>
                </li>
            </ul>
            <childComp ref="child"></childComp>
            <div class="btnclick" @click="sendMsg">点击</div>
        </div>
    </div>

    <!--底部-->
    <Footer></Footer>

  </div>
</template>

<script>

  import Header from "../common/Header"
  import Footer from "../common/Footer"
  import childComp from "../common/childComp"

    export default {
      data () {
        return {
          
        }
      },
      components: {Header,Footer,childComp
      },
      mounted(){
        
      },
      methods:{
          sendMsg(){
                this.$refs.child.getMsg('我是点击后改变的值');
          }
      }
    }
</script>

<style scoped>
  .xiaoxibox{margin-top: 0.8rem;margin-bottom:60px;padding: 0;}
  .ussrtop{padding-bottom: 30px;}
  .btnclick{width: 140px;height: 40px;line-height: 40px;text-align: center;margin:20px auto;border-radius: 5px;background: #0064ff;color: #fff;}
</style>
