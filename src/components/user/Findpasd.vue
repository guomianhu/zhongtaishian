<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="找回密码">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="adpadding">
        <div class="zhucebox">
            <h1></h1>
            <Form ref="formFind" :model="formFind">
                <ul class="zhuceul">
                    <li class="phone">
                        <input type="text" v-model="formFind.tel" maxlength="11" placeholder="请输入您的手机号码">
                    </li>
                    <li class="yzms">
                        <input type="text" v-model="formFind.code" placeholder="请输入验证码" class="yzm">
                        <div class="yzmbtn">
                            <span v-show="show" @click="getCode">发送验证码</span>
                            <span v-show="!show">{{count}}秒后重新发送</span>
                        </div>
                    </li>
                    <li class="pasd">
                        <input type="password" v-model="formFind.passwd" placeholder="请输入新密码">
                    </li>
                    <li class="pasd">
                        <input type="password" v-model="formFind.passwdCheck" placeholder="请再次输入新密码">
                    </li>
                </ul>
            </Form>
            <div class="zhucebtn">
              <input type="submit" value="确认修改" @click="resetSubmit('formFind')">
            </div>
        </div>
    </div>

  </div>
</template>

<script>

  import Header from "../common/Header"

  export default {
      data () {
        return {
          formFind: {
              code: '',
              tel:'',
              passwd:'',
              passwdCheck:''
          },
          count:60,
          show:true,
        }
      },
      components: {
        Header,
      },
      mounted(){
        
      },
      methods:{
        resetSubmit(name) {

          this.$axios.put(baseURL+'/apis/api/update_password', {
            phone:this.formFind.tel,
            password:this.formFind.passwd,
            password_confirm:this.formFind.passwdCheck,
            code:this.formFind.code
          }).then((response) =>{          //这里使用了ES6的语法
            console.log(response)       //请求成功返回的数据
            if(response.data.code==1){
              this.$Message.success(response.data.message);
            }else{
              this.$Message.error(response.data.message);
            }
          })
          },

        getCode(){
          if(this.formFind.tel != '' ){ // 1.首先判断是否未输入手机号码就点击获取验证码
            if(/^1[34578]\d{9}$/.test(this.formFind.tel)){ //2.使用正则判断手机输入的验证码是否符合规范
              const TIME_COUNT = 60; // 3.设置时间为60s
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false; // 4.隐藏获取验证码按钮,展示倒计时模块
                this.getPhoneCode(); // 5.调用后端获取验证码接口的函数
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) { // 6.设置每秒钟递减
                    this.count--;
                  } else { // 7.递减至0时,显示获取验证码按钮,隐藏倒计时模块,清除定时器this.timer,并将其置为null
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)}
            } else {
             this.$Message.error('手机号格式不正确!');
            }
          } else {
            this.$Message.error('请先填写手机号码!');
          }
        },
        getPhoneCode(){
          let phoneParam ={
            phone:this.formFind.tel
          }
          this.$axios({
            method:'get',
            url:baseURL+'/apis/api/sendSmsCode?phone='+this.formFind.tel,
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
      }
    }
</script>

<style scoped>
  .adpadding{margin-top: 0.8rem;}
  .zhuceul li input{color: #333;font-size: 14px;}
  .yzmbtn{float: right;width: calc(100% - 3rem);text-align: right;color:#2d8cf0;}
  .yzmbtn span{border:1px solid #2d8cf0;border-radius: 20px;display: inline-block;padding:0 10px;height: 30px;line-height: 30px;}
  @import '../../assets/css/alertPopShow.css'
</style>
