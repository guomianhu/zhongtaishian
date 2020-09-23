<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="考试记录">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="adpadding">
            <ul class="kaoshijl">
                <div class="nodata" v-if="!score">
                    <router-link :to="{path: '/exam'}">暂无考试记录，<span>现在去考试</span></router-link>
                </div>
                <li class="success" v-if="score > 60">
                    <div class="kstop">
                        <h2><span>{{score}}</span>分</h2>
                        <h3><router-link :to="{path: '/zhengshu'}">查看证书</router-link></h3>
                    </div>
                    <div class="ksbot">
                        <p>{{title}}</p>
                        <p>考试时间：{{gettime}}</p>
                        <p>是否通过：{{flagreselt}}</p>
                    </div>
                    <div class="linecen"></div>
                    <i class="lefti"></i>
                    <i class="righti"></i>
                </li>
                <li class="fail" v-if="score < 60">
                    <div class="kstop">
                        <h2><span>{{score}}</span>分</h2>
                        <h3><router-link :to="{path: '/exam'}">再考一次</router-link></h3>
                    </div>
                    <div class="ksbot">
                        <p>{{title}}</p>
                        <p>考试时间：{{gettime}}</p>
                        <p>是否通过：{{flagreselt}}</p>
                    </div>
                    <div class="linecen"></div>
                    <i class="lefti"></i>
                    <i class="righti"></i>
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
          title:'',
          score:null,
          flagreselt:'否',
          gettime:''
        }
      },
      components: {
        Header,Footer
      },
      mounted(){
        this.currentTime();
        this.getParams();
        if(this.$route.query.score > 60){
          this.flagreselt = '是'
        }
      },
      methods:{
        getParams(){
            this.title = this.$route.query.title
            this.score = this.$route.query.score
        },
        getTime:function(){
          var _this = this;
          let yy = new Date().getFullYear();
          let mm = new Date().getMonth()+1;
          let dd = new Date().getDate();
          let hh = new Date().getHours();
          let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
          let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
          _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        },
        currentTime(){
          setInterval(this.getTime,500)
        },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
  .ksbtn{height: 1.2rem;line-height: 1.2rem; z-index: 9999;}
  .ksbot p,.ksbot p:first-child{font-size: 14px;}
  .nodata{height:10rem; margin:auto;align-items:center; display: -webkit-flex; text-align:center;justify-content:center;font-size: 16px;}
  .nodata a{color: #666;}
  .nodata span{color: #007AFF;}
</style>
