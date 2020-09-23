<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="个人中心">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="usertbox">
          <div class="ussrtop">
              <h1><img :src="userInfo.avatar"/></h1>
                <h2>{{username}}</h2>
                <div class="resetvideo">修改头像
                    <input type="file" accept="image/*" @change="handleFile" class="inputfile"/>
                </div>
                <ul class="ustli fix">
                    <li><router-link to="/Selectaddress"><i></i><p>收获地址</p></router-link></li>
                    <li><router-link to="/Cantantus"><i></i><p>常用联系人</p></router-link></li>
                    <li><router-link to="/exam"><i></i><p>我的考试</p></router-link></li>
                </ul>
            </div>
        </div>
        <ul class="userlist fix">
            <li><router-link to="/goumaikc"><i></i><p>购买课程</p></router-link></li>
            <li><router-link to="/kaoshijilu"><i></i><p>考试记录</p></router-link></li>
            <li><router-link to="/fapiao"><i></i><p>发票管理</p></router-link></li>
            <li><router-link to="/kechenggl"><i></i><p>课程管理</p></router-link></li>
            <li><router-link to="/xuexijl"><i></i><p>学习记录</p></router-link></li>
            <li><router-link to="/shoucang"><i></i><p>我的收藏</p></router-link></li>
            <li><router-link to="/zhengshu"><i></i><p>我的证书</p></router-link></li>
            <li><router-link to="/userinfo"><i></i><p>用户设置</p></router-link></li>
            <li><router-link to="/xiaoxi"><i></i><p>我的消息</p></router-link></li>
            <li><router-link to="/tuiguang"><i></i><p>我的推广</p></router-link></li>
            <li><router-link to="/zhanghu"><i></i><p>奖励记录</p></router-link></li>
            <li @click="logout"><i></i><p>退出登录</p></li>
        </ul>
    </div>

    <!--底部-->
    <Footer></Footer>

  </div>
</template>

<script>
  import { Dialog } from 'vant'
  import Header from "../common/Header"
  import Footer from "../common/Footer"

    export default {
      data () {
        return {
          userInfo: {
            avatar: require('../../assets/images/missing-face.png')
            },
            username:'被淹死的鱼',
        }
      },
      components: {
        Header,
        Footer
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
		  logout(){
			Dialog.confirm({
                  title: '确定要退出登录么?',
             }).then(() => {
				this.$Message.info('已退出登录');
				sessionStorage.setItem("token", 'false');
				this.$router.push({path:"/home"});
             }).catch(() => {
            });
		}
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
  .userlist li:nth-child(9),.userlist li:nth-child(10),.userlist li:nth-child(11),.userlist li:nth-child(12){border-bottom: 0;}
</style>
