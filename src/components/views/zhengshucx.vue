<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="证书查询">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
        <dl slot="right" class="logindl fix" v-show="hislogin">
            <dt @click="login">登录<i>|</i></dt>
            <dt @click="register">注册</dt>
        </dl>
    </Header>

    <div class="newsbox">
        <div class="zhengshubg">
           <h1>证书查询</h1>
           <h2>我们一旦与您签定托管协议，由我们定期支付给您房租，<br>您将获得长期、稳定的房租收入</h2>
           <div class="zshubox">
              <ul class="zhform">
                  <li>
                      <h3>姓名<i>*</i></h3>
                      <h4><input type="text"></h4>
                    </li>
                    <li>
                      <h3>身份证号码<i>*</i></h3>
                      <h4><input type="text"></h4>
                    </li>
                    <li>
                      <h3>证件编号<i>*</i></h3>
                      <h4><input type="text"></h4>
                    </li>
                </ul>
                <div class="tits">温馨提示：请输入正确的信息来查询证书，姓名+身份证或者姓名+证书编号，点击查询按钮查询</div>
           </div>
           <div class="footbtn"><input type="submit" name="" value="立即提交"></div>
        </div>
    </div>

  </div>
</template>

<script>

  import Header from "../common/Header"

    export default {
      data () {
        return {
          hislogin:true,
        }
      },
      components: {
        Header,
      },
      mounted(){
        this.haslogin();
      },
      methods:{
	   //是否登录状态
	   haslogin(){
			if (sessionStorage.getItem("token") == 'true') {
				this.hislogin = false;
			}
	   },
       login(){
            this.$router.push({ path: "/login", query:{activeIndex:1}});
        },
        register(){
            this.$router.push({ path: "/Register", query:{activeIndex:2}});
        },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
  .ksbtn{height: 1.2rem;line-height: 1.2rem; z-index: 9999;}
</style>
