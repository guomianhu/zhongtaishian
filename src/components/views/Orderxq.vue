<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="订单详情">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox orderbox">
        <ul class="zililist">
          <li class="fix ordernum">
              <span class="left">订单号：201805210215</span>
                <em class="right">订单时间：2018-12-25  15:30</em>
            </li>
          <li class="fix nobg">
              <span class="left">课程名称</span>
                <em class="right">食品从业人员培从业人员训班</em>
            </li>
            <li class="fix nobg">
              <span class="left">培训价格</span>
                <em class="right">¥ 499.00</em>
            </li>
            <li class="fix nobg">
              <span class="left">适用领域</span>
                <em class="right">保健食品</em>
            </li>
            <li class="fix nobg">
              <span class="left">培训类别</span>
                <em class="right">保健食品</em>
            </li>
            <li class="fix nobg">
              <span class="left">可购买时间</span>
                <em class="right">2019-04-11  至  2019-04-31</em>
            </li>
            <li class="fix nobg">
              <span class="left">课时</span>
                <em class="right">26节课</em>
            </li>
            <li class="fix nobg">
              <span class="left">是否需要发票</span>
                <em class="right">是</em>
            </li>
            <li class="fix nobg">
              <span class="left">发票信息</span>
                <em class="right">发票信息一</em>
            </li>
            <li class="fix nobg">
              <span class="left">发票邮寄地址</span>
                <em class="right detailadr">湖南省长沙市开福区芙蓉中路北段绿地中心T2栋2302室</em>
            </li>
        </ul>
        <div class="orderbtn">
          <span class="left">订单总金额：<i>¥<b>499.00</b></i></span>
            <em class="right"><router-link to="/home">返回首页</router-link></em>
        </div>
    </div>

  </div>
</template>

<script>
  import Header from "../common/Header"

    export default {
      data () {
        return {
          
        }
      },
      components: {
        Header,
      },
      mounted(){
      },
      methods:{
       
      }
    }
</script>

<style scoped>
  .orderbox{margin-top: 0.9rem;margin-bottom:60px;}
  .switchdl dt{float: right;}
</style>
