<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="购买课程">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="shoucangbg">
            <ul class="kcullist">
                <li>
                    <div class="kctxt">
                        <h1>
                            <span class="left">订单编号：NJH7349274902039</span>
                            <span class="right">2019-04-22 15:30</span>
                        </h1>
                        <h2><a href="#">湖南省长沙市第一期食沙市第一从业培训班</a></h2>
                        <h3>
                            <p><span>保健食品</span><i>|</i><span>食品从业人员</span><i>|</i>共15课时</p>
                            <p class="col666">利用动画的形式以浅显的、让公众易于理解和接受的方式向普通大让公众易于理解和接受的方式向普通大众介绍食品相关科学知识，传播科学思想...</p>
                        </h3>
                        <div class="vidbtn">
                            <span class="left"><b>培训费用：<i>¥</i>499.00</b></span>
                            <em class="right">
                                <a href="#" class="publicbtn donezf">已支付</a>
                            </em>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="kctxt">
                        <h2><a href="#">湖南省长沙市第一期食沙市第一从业培训班</a></h2>
                        <h3>
                            <p><span>保健食品</span><i>|</i><span>食品从业人员</span><i>|</i>共15课时</p>
                            <p><span>可购买时间：2019-04-11  至  2019-04-31</span></p>
                        </h3>
                        <div class="vidbtn">
                            <span class="left"><b>培训费用：<i>¥</i>499.00</b></span>
                            <em class="right">
                                <router-link to="/pay" class="publicbtn baoming">立即支付</router-link>
                            </em>
                        </div>
                    </div>
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
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
  .ksbtn{height: 1.2rem;line-height: 1.2rem; z-index: 9999;}
</style>
