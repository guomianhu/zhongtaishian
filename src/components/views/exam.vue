<template>
  <div class="mainbox">
        <!--顶部导航-->
        <Header title="在线考试">
            <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
            <dl slot="right" class="logindl fix" v-show="hislogin">
                <dt @click="login">登录<i>|</i></dt>
                <dt @click="register">注册</dt>
            </dl>
        </Header>
        <form>
            <div class="newsbox">
                <div class="kstime">倒计时
                    <span><i>{{spikeHours}}</i>:<i>{{spikeMinutes}}</i>:<i>{{spikeSeconds}}</i></span>
                </div>
                <div class="kaoshibox">
                  <div class="kscon" v-for="(item ,index) in pageData">
                      <div class="ks_title">{{title}}</div>
                      <div class="ksinfo">本考试共<span>{{chengji.length}}</span>道题，有单选和多选，每题<span>{{score}}</span>分，多选题多选和少选均不得分，得分在<span>60</span>分以上算合格，否则不合格，请重新考试。</div>
                      <h1 class="fix">
                          <em>{{(currentPage-1)*pageSize+index+1}}、</em>
                          <span>{{item.type==0?' 单选题':' 多选题'}}</span>
                          <i>{{item.tiMu}}</i>
                      </h1>
                      <ul class="anser">
                          <li v-for="(tiao,i) in item.xuanXiang">
                              <div v-if="item.type==0">
                                  <label>
                                      <input class="radio_type" type="radio" v-model="item.picked_radio" :name="'pickedd_' +((currentPage-1)*pageSize+index)" v-bind:value="haha[i]" @change="doCheck(item,((currentPage-1)*pageSize+index))"/>
                                      {{haha[i]}}、<span>{{tiao}}</span>
                                  </label>
                              </div>
                              <div v-if="item.type==1">
                                  <label>
                                      <input class="radio_type" type="checkbox" v-model="item.pickedMany" :name="'pickedd_' +((currentPage-1)*pageSize+index)" v-bind:value="haha[i]" @change="doCheck(item,((currentPage-1)*pageSize+index))"/>
                                      {{haha[i]}}、<span>{{tiao}}</span>
                                  </label>
                              </div>
                          </li>
                      </ul>
                      <div class="ksbtn fix">
                          <div class="jiaojuan"><a @click="modal10 = true">交卷</a></div>
                          <div class="stnum" @click="modal11 = true">
                              <i>{{(currentPage-1)*pageSize+index+1}}</i>/
                              <b>{{chengji.length}}</b>
                          </div>
                          <ul class="prevnext">
                              <li class="prev" @click="prev"><a>上一题</a></li>
                              <li class="next" @click="next"><a>下一题</a></li>
                          </ul>
                          <Modal v-model="modal10" class-name="vertical-center-modal" :styles="{top:'30%',translateY:'-50%'}" title="您确定要交卷吗？" @on-ok="ok" @on-cancel="cancel">
                              <div class="scornum">您答对了<span>{{numtimu}}</span>道题，得分：<span>{{numscore}}</span>分</div>
                          </Modal>
                          <Modal v-model="modal11" class-name="vertical-center-modal" title="答题记录">
                              <dl class="anserdl fix">
                                  <dt v-for="(items,index) in chengji" :key="index">
                                      {{index+1}}、
                                      <span v-if="items.type==0">{{items.picked_radio}}</span>
                                      <span v-else>{{items.pickedMany.toString()}}</span>
                                  </dt>
                              </dl>
                          </Modal>
                    </div>
                  </div>
                </div>
            </div>
        </form>
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
      score:5,
      modal10: false,
      modal11: false,
	  hislogin:true,
      rightresult:0,
      numtimu:0,
      numscore:0,
      currentPage: 1, //当前第几页
      pageSize: 1,  //每页显示几条数据
      haha: ["A", "B", "C", "D"],
      pageData: [],  //单页数据
      title:'vue基础知识测试题',
      chengji: [
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["B"],
              tiMu: "在beforeRouteEnter钩子函数中进行console.log(this),其结果为?",
              xuanXiang: ["VueCompent实例", "undefined", "报错", "以上都不对"],
              type: 0
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["D"],
              tiMu: "vue的生命周期，执行顺序正确的是:",
              xuanXiang: ["beforeCreate -> init->create->mount->destory", "mount-> init->beforeCreate->create->destory", "beforeCreate->create->init->mount->destory", "init->beforeCreate->create->init->destory"],
              type: 0
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A"],
              tiMu: "用于监听DOM事件的指令是:",
              xuanXiang: ["v-on", "v-model", "v-bind", "v-html"],
              type: 0
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["D"],
              tiMu: "以下对vue的双向绑定说法不正确的是:",
              xuanXiang: ["采用数据劫持结合发布者-订阅者模式的方式", "通过Object.defineProperty（）来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调", "MVVM作为数据绑定的入口，整合Observer，Compile和Watcher三者，通过Observer来监听自己的model的数据变化", "vue是通过基于脏检查机制实现双向绑定"],
              type: 0
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["C"],
              tiMu: "vue-router有哪几种导航钩子，以下哪种选项不是vue-router的导航钩子?",
              xuanXiang: ["全局导航钩子", "组件内的钩子", "页面钩子", "单独路由独享组件"],
              type: 0
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["D"],
              tiMu: "以下选项中不可以进行路由跳转的是:",
              xuanXiang: ["push()", "replace()", "route-link", "jump()"],
              type: 0
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A"],
              tiMu: "以下获取动态路由{ path: '/user/:id' }中id的值正确的是:",
              xuanXiang: ["this.$route.params.id", "this.route.params.id", "this.$router.params.id", "this.router.params.id"],
              type: 0
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["D"],
              tiMu: "以下选项中不属于vuex中的属性？",
              xuanXiang: ["state", "getters", "actions", "init"],
              type: 0
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A","B","C"],
              tiMu: "导航钩子函数有哪些？它们有哪些参数？",
              xuanXiang: ["全局钩子和组件内独享的钩子", "beforeRouteEnter、afterEnter、beforeRouterUpdate、beforeRouteLeave", "有to（去的那个路由）、from（离开的路由）、next（一定要用这个函数才能去到下一个路由，如果不用就拦截）", "以上都不对"],
              type: 1
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A","B"],
              tiMu: "v-show和v-if指令的共同点和不同点",
              xuanXiang: ["v-show指令是通过修改元素的displayCSS属性让其显示或者隐藏", "v-if指令是直接销毁和重建DOM达到让元素显示和隐藏的效果", "两者相同", "以上都不对"],
              type: 1
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A","B"],
              tiMu: "Vue中引入组件的步骤?",
              xuanXiang: ["采用ES6的import ... from ...语法或CommonJSd的require()方法引入插件", "使用全局方法Vue.use( plugin )使用插件,可以传入一个选项对象Vue.use(MyPlugin, { someOption: true })", "methods方法引入", "以上都不对"],
              type: 1
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A","B","C","D"],
              tiMu: "Vue 父组件向子组件传值是如何做到的？",
              xuanXiang: ["子组件在props中创建一个属性，用来接收父组件传过来的值", "在父组件中注册子组件", "在子组件标签中添加子组件props中创建的属性", "把需要传给子组件的值赋给该属性"],
              type: 1
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A","B","C"],
              tiMu: "Vue 子组件向父组件传值是如何做到的？",
              xuanXiang: ["子组件中需要以某种方式（如点击事件）的方法来触发一个自定义的事件", "将需要传的值作为$emit的第二个参数，该值将作为实参传给响应事件的方法", "在父组件中注册子组件并在子组件标签上绑定自定义事件的监听", "以上都不对"],
              type: 1
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A","B","C"],
              tiMu: "前端目前三大主流框架有哪些？",
              xuanXiang: ["vue", "react", "angular", "以上都不对"],
              type: 1
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A","B","C"],
              tiMu: "Vue核心思想的理解",
              xuanXiang: ["数据驱动", "组件化", "响应式", "以上都不对"],
              type: 1
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A","B","C"],
              tiMu: "Vue中组件分为三种，分别是",
              xuanXiang: ["全局组件", "局部组件", "单文件组件", "以上都不对"],
              type: 1
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A","B","C"],
              tiMu: "设计模式的主流框架模式有哪些？",
              xuanXiang: ["MVC", "MVP", "MVVM", "以上都不对"],
              type: 1
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["D"],
              tiMu: "依赖：package.json为项目配置信息文档，其中dependencies为()依赖？",
              xuanXiang: ["生产", "编译", "全局", "开发"],
              type: 0
          },
          {
              isRight: null,
              picked_radio: "",
              pickedMany:[],
              daan: ["A", "B", "C"],
              tiMu: "工程化后项目启动webpack-server服务器指令，项目打包指令有哪些？",
              xuanXiang: ["npm run dev", "npm run start", "npm run build", "以上都不对"],
              type: 1
          },
          {
              isRight: null,
              ppicked_radio: "",
              pickedMany:[],
              daan: ["A"],
              tiMu: "Vue可以在不同组件之间进行动态切换，这种方法称为动态组件，可以通过 Vue的()元素加一个特殊的js属性实现",
              xuanXiang: ["component", "created", "methods", "computed"],
              type: 0
          },
      ]
      }
    },
    components: {
      Header,Footer
    },
    computed: {
      allPageNum: {
          get: function () {
              return parseInt((this.chengji.length + this.pageSize - 1) / this.pageSize);
          }
      },
      ...mapState(['countdown']),
      ...mapGetters(['spikeHours','spikeMinutes','spikeSeconds']),
    },
    created(){
      this.countdowntimes();
    },
    mounted() {
      this.init();
	  this.haslogin();
      const that = this;
        this.timeObj = setInterval(function () {
          that.splikeTime();
      }, 1000);
    },
    methods: {
        ...mapActions(['countdowntimes']),
        ...mapMutations(['splikeTime']),
		//是否登录状态
		haslogin(){
			if (sessionStorage.getItem("token") == 'true') {
				this.hislogin = false;
			}
		},
        init() {
            this.pageData = this.chengji.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        },
        doCheck(item, index) {
            if(item.type==0){
                //单选
                if (item.picked_radio == item.daan[0]) {
                    item.isRight = true;
                    console.log(item.isRight,item.picked_radio,index+1);
                    this.numtimu += 1; //当选择正确时，累加答对的题
                    this.numscore = this.numtimu * this.score
                } else {
                    item.isRight = false;
                    this.numscore = this.numtimu * this.score
                }
            }else{
                //多选
                if (JSON.stringify(item.pickedMany.sort()) == JSON.stringify(item.daan.sort())) {
                    item.isRight = true;
                    console.log(item.isRight,JSON.stringify(item.pickedMany),index+1);
                    this.numtimu += 1;
                    this.numscore = this.numtimu * this.score
                } else {
                    item.isRight = false;
                    this.numscore = this.numtimu * this.score
                }
            }
        },
        prev() {  //上一页
            if (this.currentPage > 1) {
                this.currentPage = this.currentPage - 1;
                this.init();
            }
        },
        next() {  //下一页
            if (this.currentPage < this.allPageNum) {
                this.currentPage = this.currentPage + 1;
                this.init();
            }
        },
        ok(){
            let params = {
                title: this.title,
                score: this.numscore
            }
            if(this.numscore < 60){
              this.$Message.info('考试不合格，请重新考试');
            }else{
              this.$Message.success('恭喜您，考试合格');
            }
            this.$router.push({path:"/kaoshijilu",query:params});
            this.$router.go(0);
        },
        cancel(){  
        },
        login(){
            this.$router.push({ path: "/login", query:{activeIndex:1}});
        },
        register(){
            this.$router.push({ path: "/Register", query:{activeIndex:2}});
        },
    },
    destroyed(){
        clearInterval(this.timeObj);
    },
}
</script>
 
<style lang="less" scoped>
  .vertical-center-modal{
          display: flex;
          align-items: center;
          justify-content: center;
          .ivu-modal{
              top: 0;
          }
      }
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
  .ksbtn{height: 1.2rem;line-height: 1.2rem; z-index: 9999;box-shadow: 2px 2px 5px #666;}
  .anser li{margin-top: 10px;}
  .kscon h1 span,.kscon h1 span em,.kscon h1 span i{float: left;}
  .scornum{text-align: center;}
  .scornum span{color: #f00;font-size:18px;font-weight: bold;padding:0 5px;}
  .anserdl{display:flex;flex-wrap:wrap;display: -webkit-flex;}
  .anserdl dt{height: 30px;line-height: 30px; padding:0 2px; border:1px solid #ddd;display: inline-block;margin: 5px; border-radius: 5px;white-space: nowrap;text-align: center;flex:1;justify-content: center;}
  .anserdl dt span{color: #f00;}
  .anserdl dt.active{border-color: #f00;color: #f00;}
  .ksinfo{margin-bottom: 20px;color: #666;}
  .ksinfo span{padding: 0 2px;color: #f00;}
  .ks_title{text-align: center;font-weight: bold;padding: 10px 0;font-size: 16px;}

  .radio_type{width:15px;height:15px;appearance:none;position:relative;outline:none;top: -3px;}
  .radio_type:before{content:"";width:15px;height:15px;border:1px solid #0064ff;display:inline-block;border-radius:50%;vertical-align:middle;}
  .radio_type:checked:before{content:"";width:15px;height:15px;border:1px solid #0064ff;display:inline-block;border-radius:50%;vertical-align:middle;}
  .radio_type:checked:after{content:"";width:7px;height:7px;text-align:center;background:#0064ff;border-radius:50%;display:block;position:absolute;left: 0;right: 0;bottom: 0;margin: auto;}
  .radio_type:checked + label{color:#edd19d;}
</style>
