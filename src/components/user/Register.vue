<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="用户注册">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="adpadding">
        <div class="zhucebox">
            <h1></h1>
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
                <li class="pasd">
                    <input type="password" v-model="passwdCheck" placeholder="请再次输入密码">
                </li>
                <li class="yzms">
                    <input type="text" v-model="code" placeholder="请输入验证码" class="yzm">
                    <div class="yzmbtn">
                        <span v-if="istrueyzm" @click="yzmClick">发送验证码</span>
                        <span v-else="sendyzm">{{yzmtext}}秒后重新发送</span>
                    </div>
                </li>
            </ul>
            <div class="tiaok">
                <label>
                      <input class="radio_input" type="checkbox" v-model="checkbox" />
                      <span></span>
                      <b class="hm_title">注册即代表您已阅读并同意</b>
                </label>
                <i @click="modal1 = true">《服务条款》</i>
                <Modal
                    v-model="modal1" title="中泰食安服务条款" @on-ok="ok" @on-cancel="cancel">
                    <p>工标网服务涉及到的工标网产品的所有权以及相关软件的知识产权归工标网所有。工标网所提供的服务必须按照其发布的公司章程，服务条款和操作规则严格执行。本服务条款的效力范围及于工标网的一切产品和服务，用户在享受工标网任何单项服务时，应当受本服务条款的约束。用户通过进入注册程序并点击“我接受”的按钮，即表示用户与工标网已达成协议，自愿接受本服务条款的所有内容。</p>
                    <p>当用户使用工标网各单项服务时，用户的使用行为视为其对该单项服务服务条款以及工标网在该单项服务中发出的各类公告的同意。</p>
                </Modal>
            </div>
            <div class="zhucebtn">
              <input type="submit" value="注册" @click="RegisterClick">
            </div>
            <div class="btntis">已有账号，现在去<router-link to="/Login">登录</router-link></div>
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
          passwdCheck:'',
          code:'',
          checkbox:'',
          istrueyzm:true,
          yzmtext:60,
          modal1: false
        }
      },
      components: {
        Header,
      },
      mounted(){
        
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

        //验证码倒计时函数
        validateBtn(){
            var timeval = this.yzmtext;
            var timer = setInterval(() => {
            if(this.yzmtext == 0) {
                clearInterval(timer);
                this.istrueyzm=true;
                this.yzmtext = timeval;
            } else {
                this.istrueyzm=false;
                this.yzmtext--
           }
          },1000)
            this.getPhoneCode()//调用后端发送验证码接口
        },

        //发送验证码
        yzmClick(){
            let flag = this.isphone();
            if (!flag) {
                alertInfo("请输入11位有效的手机号");
                return;
            }else{
                this.validateBtn();    
            }
        },

        RegisterClick(){
            let that = this;
            let regName = this.regName;
            let userphone = this.userphone;
            let password = this.password;
            let passwdCheck = this.passwdCheck;
            let code = this.code;
            let flag = this.isphone();
            var checkbox = this.checkbox;
            if(regName ==""){
                alertInfo("请输入用户名");
                return;
            }
            if (!flag) {
                return;
            }
            if(password ==""){
                alertInfo("请输入密码");
                return;
            }
            if(passwdCheck ==""){
                alertInfo("请输入确认密码");
                return;
            }
            if(password != passwdCheck){
                alertInfo("两次输入的密码不一致");
                return;
            }
            if(code ==""){
                alertInfo("请输入验证码");
                return;
            }
            if (!checkbox) {
                alertInfo("请勾选服务协议");
                return;
            }
            else{
                //alertInfo("注册成功");
                let registerParam ={
                  role_id:1,
                  name:this.regName,
                  phone:this.userphone,
                  password:this.password,
                  password_confirm:this.passwdCheck,
                  code:this.code,
                  checkbox:this.checkbox
                }
                this.$axios({
                  method:'post',
                  url:baseURL+'/api/register',
                  data:registerParam,
                }).then((response) =>{          //这里使用了ES6的语法
                  console.log(response)       //请求成功返回的数据
                  if(response.data.code==1){
                    this.$Message.success(response.data.message);
                  }else{
                    this.$Message.error(response.data.message);
                  }
                })
                setTimeout(function(){
                    that.$router.push({path:"/Login"});
                },500)
            }
        },

        getPhoneCode(){
          let phoneParam ={
            phone:this.userphone
          }
          this.$axios({
            method:'get',
            url:baseURL+'/api/sendSmsCode?phone='+this.userphone,
            data:phoneParam,
          }).then((response) =>{          //这里使用了ES6的语法
            console.log(response);    //请求成功返回的数据
            if(response.data.code==1){
              this.$Message.success(response.data.message);
            }else{
              this.$Message.error(response.data.message);
            }
          })
        },

        ok () {
            this.$Message.info('关闭成功');
        },
        cancel () {
            this.$Message.info('关闭成功');
        }

      }
    }
</script>

<style scoped>
  .adpadding{margin-top: 1.2rem;}
  .zhucebox{padding: 0;}
  .zhuceul li input{color: #333;font-size: 14px;}
  .yzmbtn{float: right;width: calc(100% - 3rem);text-align: right;color:#2d8cf0;}
  .yzmbtn span{border:1px solid #2d8cf0;border-radius: 20px;display: inline-block;padding:0 10px;height: 30px;line-height: 30px;}
  .tiaok i{margin-top:5px;display: inline-block;}
  .tiaok label{height:20px; margin-top:5px; float:left;}
  .tiaok .hm_title{ line-height:20px; width:auto; color:#333;}
  .radio_input{appearance:none;-webkit-appearance:none;outline:none;display:none; float:left;}
  .radio_input+span{width:16px;height:16px; border:1px solid #c0c0c0; border-radius:50%; display:inline-block; background:#fff; float:left; margin-right:5px; position:relative;top: 2px;}
  .radio_input:checked+span{ border-color:#0064ff;}
  .radio_input:checked+span::before{content:'';position:absolute; left:50%;top:50%; transform: translate(-50%,-50%); width:7px;height:7px;border-radius:50%; background:#0064ff;}
  .radio_input+span.checked::before{content:'';position:absolute; left:4px;top:4px; width:7px;height:7px;border-radius:50%; background:#0064ff;}
  .ivu-modal-content p{color: #666;line-height: 24px;text-indent: 2em;}
  @import '../../assets/css/alertPopShow.css'
</style>
