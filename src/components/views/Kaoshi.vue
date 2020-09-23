<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="在线考试">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="kstime">倒计时
          <span><i>{{spikeHours}}</i>:<i>{{spikeMinutes}}</i>:<i>{{spikeSeconds}}</i></span>
        </div>
        <div class="kaoshibox">
            <div class="kscon">
              <h1><span>单选题</span>下面哪种哪种植物中含有的毒素会致人双目失明？</h1>
                <ul class="kstimu">
                    <li><span>A</span><em>西瓜</em></li>
                    <li><span>B</span><em>马铃薯</em></li>
                    <li><span>C</span><em>西红柿</em></li>
                    <li><span>D</span><em>冬瓜</em></li>
                </ul>
                <div class="ksbtn fix">
                  <div class="jiaojuan"><a href="#">交卷</a></div>
                    <div class="stnum"><i>12</i>/<b>100</b></div>
                    <ul class="prevnext">
                        <li class="prev"><a href="#">上一题</a></li>
                        <li class="next"><a href="#">下一题</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!--底部-->
    <Footer></Footer>

  </div>
</template>

<script>
  import {mapState,mapActions,mapGetters,mapMutations} from 'vuex';
  import Header from "../common/Header"
  import Footer from "../common/Footer"

    export default {
      data () {
        return {
          timeObj:null,
        }
      },
      components: {
        Header,Footer
      },
      created(){
        this.countdowntimes();
      },
      mounted(){
        const that = this;
        this.timeObj = setInterval(function () {
            that.splikeTime();
        }, 1000);
      },
      computed:{
        ...mapState(['countdown']),
        ...mapGetters(['spikeHours','spikeMinutes','spikeSeconds']),
      },
      methods:{
        ...mapActions(['countdowntimes']),
        ...mapMutations(['splikeTime']),
      },
      destroyed(){
          clearInterval(this.timeObj);
      },
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
  .ksbtn{height: 1.2rem;line-height: 1.2rem; z-index: 9999;box-shadow: 2px 2px 5px #666;}

</style>
