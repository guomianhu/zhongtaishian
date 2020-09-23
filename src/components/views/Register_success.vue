<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="注册成功">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox orderbox">
        <div class="adpadding zhuce_success">
            <h1></h1>
            <h2>恭喜您，注册成功啦！</h2>
            <h3>您可以在平台内购买课程，学习课程<br>在线考试，申请证书</h3>
            <h4>温馨提示：您成功支付后，订单状态的更新可能存在短期的延迟，建议您半小时后再查询您的支付情况。</h4>
            <h5><router-link to="/userinfo">马上去完善资料</router-link></h5>
            <h5 class="mtop30"><router-link to="/login">登录</router-link></h5>
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
  .mtop30{margin-top: 30px;}
</style>
