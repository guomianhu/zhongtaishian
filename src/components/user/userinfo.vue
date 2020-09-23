<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="用户设置">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="zltop">
            <h1>
              <img :src="userInfo.avatar"/>
              <input type="file" accept="image/*" @change="handleFile" class="inputfile"/>
              <i></i>
            </h1>
            <p>注：免冠照关系到学习过程中的人脸识别，</p>
            <p>一经上传无法更改。请谨慎操作</p>
        </div>
        <ul class="zililist">
          <li class="fix">
              <span class="left">用户名</span>
                <input class="right" type="text" placeholder="请设置你的用户名" v-model="username">
            </li>
            <li class="fix">
              <span class="left">您的姓名</span>
                <input class="right" type="text" placeholder="请输入" v-model="name">
            </li>
            <li class="fix">
              <span class="left">性别</span>
                <div class="sexbox">
                  <input type="text" v-model="sexval" placeholder="请选择" readonly @click="modal1 = true">
                    <Modal v-model="modal1" title="请选择性别" @on-ok="ok" @on-cancel="cancel" :styles="{top: '30%'}">
                        <dl class="xingblist">
                            <dt><label><input type="radio" value="男" v-model="param" name="xb"><b>男</b></label></dt>
                            <dt><label><input type="radio" value="女" v-model="param" name="xb"><b>女</b></label></dt>
                        </dl>
                    </Modal>
                </div>
            </li>
            <li class="fix">
              <span class="left">电话号码</span>
                <input class="right" type="text" placeholder="请输入" v-model="tell" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="11">
            </li>
            <li class="fix">
              <span class="left">身份证号</span>
                <input class="right" type="text" placeholder="请输入" v-model="sfznum" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="18">
            </li>
            <li class="fix">
                <span class="left">所在地区</span>
                <div class="selectadd">
                    <input type="hidden" v-model="cityselect">
                    <choose-city ref="headerChild"></choose-city>
                </div>
            </li>
            <li class="fix">
              <span class="left">详细地址</span>
                <input class="right" type="text" placeholder="请输入" v-model="detailcity">
            </li>
        </ul>
        <div class="footbtn"><input type="submit" @click="save_userinfo" value="保存"></div>
    </div>

  </div>
</template>

<script>

  import Header from "../common/Header"
  import chooseCity from "../common/chooseCity"

    export default {
      data () {
        return {
          modal1: false,
          sexval:'',username:'',name:'',tell:'',sfznum:'',cityselect:'',detailcity:'',
          param:'男',
          userInfo: {
            avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'
            }
        }
      },
      components: {
        Header,chooseCity
      },
      mounted(){
        
      },
      methods:{
          // 将头像显示
          handleFile: function (e) {
            let $target = e.target || e.srcElement
            let file = $target.files[0]
            var reader = new FileReader()
            reader.onload = (data) => {
              let res = data.target || data.srcElement
              this.userInfo.avatar = res.result
            }
            reader.readAsDataURL(file)
          },
          ok(){
            this.sexval = this.param
          },
          cancel(){
          },
          save_userinfo(){
              let params={
                username:this.username,
                name:this.name,
                sexval:this.sexval,
                tell:this.tell,
                sfznum:this.sfznum,
                cityselect:this.$refs.headerChild.model1+this.$refs.headerChild.model2+this.$refs.headerChild.model3,
                detailcity:this.detailcity,
              }
              console.log(params)
              alertInfo("保存成功");
              this.$router.push({path:'/Me'})
          },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
  .selectadd{float: right;width: calc(100% - 50px);}
  .xingblist{position: static;margin-top: 0;}
</style>
