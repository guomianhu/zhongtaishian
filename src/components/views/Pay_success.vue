<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="支付成功">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="adpadding zhuce_success">
        <h1 class="zfbg"></h1>
        <h2>恭喜您，支付成功啦！</h2>
        <div class="zfcgtxt">
          <p>成功支付：<i>¥300.00</i>元</p>
            <p>支付方式：微信支付</p>
            <p>订单编号：URYWUID48574930</p>
        </div>
        <h4>温馨提示：您成功支付后，订单状态的更新可能存在短期的延迟，建议您半小时后再查询您的支付情况。</h4>
    </div>
    <div class="zhifubtn"><router-link to="/Order">查看订单</router-link></div>

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
  .zhifubox{margin-top: 0.9rem;margin-bottom:60px;}
</style>
