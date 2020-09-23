<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="购物车">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
        <dl slot="right" class="logindl fix" v-show="hislogin">
            <dt @click="login">登录<i>|</i></dt>
            <dt @click="register">注册</dt>
        </dl>
    </Header>

    <div class="newsbox">
		
		<!-- 购物车为空 -->
		<div class="empty" v-if="emptycart">
			<h1><img src="../../assets/images/emptyCart.jpg"></h1>
			<div class="empty-tips" @click="bindindex">空空如也,<span>随便逛逛</span></div>
		</div>
        <div v-else class="adpadding">
            <ul class="index_szlist fix">
                <li v-for="(item,index) in cartlist" :key="index">
                    <div class="zfright">
                        <input type="checkbox" :id="item._id" :name="'checkbox_'+index" v-model="item.select" @change="itemCheck(item)">
                        <label class="label" :for="item._id"></label>
                    </div>
                    <div class="szpicimg"><img :src="item.images"></div>
                    <div class="sztxt">
                      <h1>{{item.desc}}</h1>
                      <h2 class="fix">{{item.title}}<span @click="delhome(index)">删除</span></h2>
                      <h3 class="fix">
                        <span>￥{{item.views}}</span>
                        <div class="fj_numadd right">
                            <span class="reduc" @click="reduce(index)":disabled="item.stars===0"></span>
                            <input type="text" class="num" readonly='readonly' :value="item.stars" />
                            <span class="add" @click="plus(index)">+</span>
                        </div>
                      </h3>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <div class="cartfoot fix">
        <div class="zfright" style="margin-top:15px;width: auto;height: auto;overflow: visible;">
          <label class="qxlabel fix">
              <input type="checkbox" id="radio" v-model="isAllCheck" @change="selectedAll">
              <label class="label" for="radio"></label><span>全选</span>
          </label>
        </div>
        <div class="zjq">
            <p class="p1">合计:￥<span>{{totalPrice}}</span>元</p>
            <p class="yf">不含运费</p>
        </div>
        <div class="jsbtn" :class="{'jsbtnactive':total > 0}" @click="paycart">结算({{total}})</div>
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
            cartlist:[],
            isAllCheck: false,
            total:0,
            totalPrice:0,
			hislogin:true,
			emptycart:false,
        }
      },
      components: {
        Header,Footer
      },
      computed:{
        
      },
      mounted(){
        this.cartdada();
        this.count_totalPrice();
		this.haslogin();
      },
 
      methods:{
        cartdada(){
          this.$axios.get('https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/10').then(res => {
              this.cartlist = res.data.data;
              console.log(this.cartlist)
          })
        },
		
		//是否登录状态
		haslogin(){
			if (sessionStorage.getItem("token") == 'true') {
				this.hislogin = false;
			}
		},
		
		bindindex(){
			this.$router.push({ path: "/home"});
		},

        //数量加
        plus(index){
            let that=this;
            this.cartlist[index].stars++;
            setTimeout(function(){
                that.count_totalPrice();
            },500)
        },

        //数量减
        reduce(index){
            let that=this;
            if (this.cartlist[index].stars === 0) {
                return;
            }
            this.cartlist[index].stars--;
            setTimeout(function(){
                that.count_totalPrice();
            },500)
        },

        //计算总价格
        count_totalPrice() {
            let smprice=0;
            let numb = 0;
            let cartlist = this.cartlist;
            for(var i = 0; i < cartlist.length; i++) {
              if(cartlist[i].select == true) {
                  smprice += cartlist[i].stars * cartlist[i].views;
                  numb += cartlist[i].stars;
              }
            }
            this.totalPrice = smprice.toFixed(2);
            this.total = numb;
        },

        //删除
        delhome(index){
			Dialog.confirm({
                  title: '确定要删除该条数据么?',
             }).then(() => {
				let that=this;
				this.cartlist.splice(index,1);
				setTimeout(function(){
				    that.count_totalPrice();
				},500)
				if(this.cartlist == 0){
					this.emptycart = true;
				}
             }).catch(() => {
            });
        },

        // 控制全选 全不选
        selectedAll() {
           this.cartlist.forEach(item => {
                !this.isAllCheck ? item.select = false : item.select = true
                this.count_totalPrice();
            })
        },

        // 当子选项全选中时 全选按钮也要选中 反之则不选中
        itemCheck(item) {
           var arrTrue = []  // 定义两个空数组 当子选项是选中的状态则放入arrTrue数组中反之放进arrFalse里
           var arrFalse = []  
           this.cartlist.forEach(item=> {
               if(item.select) {
                   arrTrue.push(item.select)
                   this.count_totalPrice();
               }else {
                   arrFalse.push(item.select)
                   this.count_totalPrice();
               }
           })
           // 当arrTrue长度等于购物车列表的数组的长度时，说明全部选中
           if(arrTrue.length == this.cartlist.length) {
               this.isAllCheck = true
           }
           // 当arrFalse 长度大于0时 说明其中有 没有勾选的子选项
           if(arrFalse.length >0) {
               this.isAllCheck = false
           }
        },

        paycart(){
            if(this.total > 0){
                var cartParam ={
                  total:this.total,
                  totalPrice:this.totalPrice
                }
                console.log(cartParam)
                this.$router.push({name:'Pay',params:cartParam})
            }else{
              return false
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
  .mainbox .newsbox{background: #fff;}
  .newsbox{margin-top: 0.8rem;margin-bottom:120px;}
  .adpadding{padding-top: 0;}
  .sztxt h1{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
  .index_szlist li+li{border-top:1px solid #dcdcdc;padding-top: 15px;}
  .index_szlist li h3{font-size: 16px;color: #f00;}
  .checkbox{width: 30px;float: left;margin-top: 40px;}
  .szpicimg{margin-right: 10px;}
  .sztxt{width:calc(100% - 30px - 10px - 1.9rem);float: left;border-bottom: 0;height: auto;}
  .sztxt h2{height: 24px;line-height: 24px;}
  .sztxt h2 span{width:50px;height:24px; line-height: 24px; float: right;border: 1px solid #dcdcdc;display: inline-block;text-align: center;border-radius: 2px;}
  .szpicimg{height: 2.1rem;}
  .szpicimg img{border-radius: 0;}
  .sztxt h1{margin-top: 5px;min-height: 38px;}
  .fj_numadd{border: 1px solid #dcdcdc;height:28px;}
  .fj_numadd span{ float:left; width:28px; height:28px; line-height:28px; text-align:center; font-size:18px; display:block; color:#666;position: relative;}
  .fj_numadd input,.fj_numadd em{  float:left; color:#666;}
  .reduc::before{content: "";position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;background: #666;width: 8px;height: 2px;}
  .fj_numadd input{border-left:1px solid #dcdcdc; border-right:1px solid #dcdcdc;width:28px;border-bottom: 1px solid #dcdcdc; height:27px; line-height:27px;text-align: center;outline: none;}
  .szpicimg{border: 0;border-radius: 0;}
  .cartfoot{width: 7.5rem;height: 50px;background: #fff;position: fixed;left: 0;right: 0;bottom: 60px;margin: auto;-webkit-box-shadow:2px 2px 5px #666; box-shadow:2px 2px 5px #666;}
  .cartfoot label,.zjq{float: left;}
  .cartfoot label{line-height: 50px;margin-left: 5px;}
  .cartfoot label span{margin-left: 5px;position: relative;top: -2px;}
  .zjq{margin-left:15px;padding-top: 5px;}
  .zjq .p1{font-weight: bold;}
  .zjq span{color: #f00;}
  .jsbtn{float: right;width: 120px;line-height: 50px;text-align: center;background: #999;color: #fff;font-size: 16px;}
  .zfright{float: left;margin-top: 40px;margin-right:5px;overflow: visible;}
  .zfright input{ display:none; outline:none;}
  .zfright .label{ width:0.4rem; height:0.4rem; display:inline-block; border:1px solid #ccc; background:#f4f4f4; border-radius:50%; cursor:pointer; position:relative;display: inline-block;}
  .zfright input:checked + .label{ background:#eee;-webkit-transition: background-color .3s ease-in;transition: background-color .3s ease-in;}
  .zfright input:checked + .label:after{-webkit-transform: scale(1);transform: scale(1);-webkit-transition: transform .2s ease-in;transition: transform .2s ease-in;}
  .zfright label.qxlabel{width: auto;height: auto;border: 0;border-radius: 0;background: #fff;}
  .zfright label.qxlabel span{display: inline-block;line-height: 20px;position: relative;top: -15px;margin-left:7px;}
  .jsbtnactive{background: #f00;}
  
  .empty{position:fixed;left: 0;top:0;width: 100%;height: 100%;display:flex;justify-content: center;flex-direction: column;
align-items:center;background: #fff; z-index: 9;}
  .empty img{width: 120px;height: 80px;}
  .empty-tips{display:flex;font-size: 14px;color: #666;}
  .empty-tips span{color: #fa436a;margin-left: 8px;}
</style>
