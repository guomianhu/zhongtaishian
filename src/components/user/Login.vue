<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="用户登录">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="adpadding">
        <div class="zhucebox">
            <h1></h1>
            <form>
                <ul class="zhuceul">
                    <li class="phone">
                        <input type="text" placeholder="请输入用户名" v-model="regName">
                    </li>
                    <li class="phone">
                        <input type="text" placeholder="请输入您的手机号码" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="11" v-model="userphone">
                    </li>
                    <li class="pasd">
                        <input type="password" v-model="password" placeholder="请输入密码">
                    </li>
                    <li class="yzms">
                        <input type="text" v-model="code" placeholder="请输入验证码" class="yzm">
                        <span class="yzmimg" @click="createCode">{{ checkCode}}<em>,换一张</em></span>
                    </li>
                </ul>
            </form>
            <div class="forget"><router-link to="/Findpasd">忘记密码 ？</router-link></div>
            <div class="zhucebtn loginbtn">
              <input type="submit" value="登录" @click="loginClick">
            </div>
            <div class="btntis">没有账号，现在去<router-link to="/Register">注册</router-link></div>
        </div>
    </div>

  </div>
</template>

<script>

  import Header from "../common/Header"

  export default {
      data () {
        return {
          regName: '',
          userphone: '',
          password: '',
          code:'',
          checkCode:'',
        }
      },
      components: {
        Header,
      },
      mounted(){
        this.createCode();
      },
      methods:{

        //验证手机号
        isphone() {
            let userphone = this.userphone;
            if (userphone <= 0) {
                alertInfo("请输入手机号");
                return false;
            }
            var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (!myreg.test(userphone)) {
                alertInfo("手机号格式不正确");
                return false;
            } else {
                return true;
            }
        },

        loginClick(){
            let that = this;
            let regName = this.regName;
            let userphone = this.userphone;
            let password = this.password;
            let code = this.code;
            let flag = this.isphone();
            if(regName ==""){
                alertInfo("请输入用户名");
                return;
            }
            if (!flag) {
                return;
            }
            if(password ==""){
                alertInfo("请输入登录密码");
                return;
            }
            if(code ==""){
                alertInfo("请输入验证码");
                return;
            }
            if(code != this.checkCode){
                alertInfo("验证码不正确");
                return;
            }
            else{
                let loginParam ={
                  regName:this.regName,
                  username:this.userphone,
                  password:this.password,
                  code:this.code,
                  grant_type:"password",
                  client_id:"testclient",
                  client_secret:"testpass"
                }
                this.$axios({
                  method:'post',
                  url:'/api/api/login',
                  data:loginParam,
                }).then((response) =>{          //这里使用了ES6的语法
                  console.log(response)       //请求成功返回的数据
                  if(response.data.code==1){
                    this.$Message.success(response.data.message);
                  }else{
                    this.$Message.error(response.data.message);
                  }
                  })
                setTimeout(function(){
                    alertInfo("登录成功");
					sessionStorage.setItem("token", 'true');
                    that.$router.push({path:"/me"});
                },500)
            }
        },
        createCode() {
          var codev = "";
          const codeLength = 4; //验证码的长度  
          const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
          for(let i = 0; i < codeLength; i++) { //循环操作  
            let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
            codev += random[index]; //根据索引取得随机数加到code上  
          }
          this.checkCode = codev; //把code值赋给验证码  
        },
      }
    }
</script>

<style scoped>
  .adpadding{margin-top: 1.2rem;}
  .zhucebox{padding: 0;}
  .zhuceul li input{color: #333;font-size: 14px;}
  .yzmimg{margin-top:0;margin-right: 0;height: 100%;text-align: center;border:1px solid #0064ff;width: 2.2rem;height: 34px;line-height: 34px;border-radius: 20px;color: #0064ff;}
  @import '../../assets/css/alertPopShow.css'
</style>
