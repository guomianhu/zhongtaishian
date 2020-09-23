<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="视频学习">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
        <dl slot="right" class="logindl fix">
            <dt @click="login">登录<i>|</i></dt>
            <dt @click="register">注册</dt>
        </dl>
    </Header>

    <div class="newsbox">
        <div class="videodiv">
          <video class="video" width="100%" height="100%" controls autoplay>
              <source :poster="$route.query.image" src="../../assets/images/mov_bbb.mp4" type="video/mp4">
          </video>
        </div>
        <div class="shizibox">
        <ul class="vid_tit fix shizitit">
            <li @click="cur=0" :class="{active:cur==0}">视频</li>
            <li @click="cur=1" :class="{active:cur==1}">笔记</li>
        </ul>
        <div class="kccon_tab">
            <div class="videocon" v-show="cur==0">
               <div class="vidtop">
                   <h2>课程名称：{{detail.desc}}</h2>
                   <h3>
                       <p><b>结束时间：</b>{{detail.createdAt}}</p>
                       <p><b>培训费用：</b>￥:<i>{{detail.views}}.00</i></p>
                   </h3>
               </div>
               <div class="vidcen">
                   <span class="left">当前播放：<a> {{detail.title}}</a></span>
                   <em class="right"><a>查看更多></a></em>
               </div>
               <ul class="vidnum">
                   <li class="active"><a href="#">1</a></li>
                   <li><a href="#">2</a></li>
                   <li><a href="#">3</a></li>
                   <li><a href="#">4</a></li>
                   <li><a href="#">5</a></li>
                   <li><a href="#">6</a></li>
                   <li><a href="#">7</a></li>
                   <li><a href="#">8</a></li>
                   <li><a href="#">9</a></li>
                   <li><a href="#">10</a></li>
                   <li><a href="#">11</a></li>
                   <li><a href="#">12</a></li>
                   <li><a href="#">13</a></li>
                   <li><a href="#">14</a></li>
                   <li><a href="#">15</a></li>
                   <li><a href="#">16</a></li>
                   <li><a href="#">17</a></li>
                   <li><a href="#">18</a></li>
                   <li><a href="#">19</a></li>
                   <li><a href="#">20</a></li>
               </ul>
               <div class="videobot">
                   <h2>课程介绍</h2>
                   <p>{{detail.desc}}</p>
                   <img :src="detail.images">
                   <p>据《纽约时报》8日报道，当地时间7日，俄罗斯科研机构副所长提洪 诺娃（Katerina Tkhonova）接受电视访问，介绍她的团队正在研发 一种能阅读脑波的设备。 虽然普京从未公开承认自己的小女儿与这位 科学家的关系，但 他曾说过“我的女儿正致力于科学领域发展”，而 这两人的名字中刚好 也都有卡捷琳娜（Katerina）。加之提洪诺娃的 外表也与普京极像，因此 不少俄罗斯和西方媒体都认为提洪诺娃就是 普京的小女儿。</p>
               </div>
               <div class="plbtn">
                   <textarea placeholder="输入我的笔记... ..." class="btntxt"></textarea>
                   <input type="submit" name="" class="btnsub">
               </div>
            </div>

            <ul class="kc_jianjie" v-show="cur==1">
                    <li v-for="(item,index) in getApibj" :key="index">
                        <div class="plimg"><img :src="item.coverImageUrl"></div>
                        <div class="pltxt">
                            <h3>{{item.title}}</h3>
                            <h4>2019-04-11 15:30</h4>
                            <p>{{item.desc}}</p>
                        </div>   
                    </li>
                    <li>
                         <div class="plbtn">
                           <textarea placeholder="输入我的笔记... ..." class="btntxt"></textarea>
                           <input type="submit" name="" class="btnsub">
                        </div>
                    </li>
                </ul>
        </div>
    </div>
    </div>

    <!--底部-->
    <div class="bottom-tab">
        <div class="tab-item" @click="switchTo('/')">
            <img :src="'/' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal">
            <span :class="{active: '/' === $route.path}">首页</span>
        </div>
        <div class="tab-item" @click="switchTo('/shoucang')">
            <img :src="'/shoucang' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal">
            <span :class="{active: '/shoucang' === $route.path}">收藏</span>
        </div>
        <div class="tab-item">
          <a @click="Tocart">
            <img class="cartimg" :src="'/cart' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal">
            <span class="carttxt" :class="{active: '/cart' === $route.path}">购物车</span>
            <div class="cartnum" v-if="this.$store.state.cartlength > 0">{{this.$store.state.cartlength}}</div>
          </a>
        </div>
        <div class="tab-item itemt cartbtn" @click.prevent="addToShopCar($event)" ref="btn">加入购物车</div>
        <div class="tab-item itemt buybtn" @click="buyshop">立即购买</div>
  </div>

  </div>
</template>

<script>
    import Header from "../common/Header"

    export default {
      data () {
        return {
          cur:0,
          showcartnum:true,
          cartlength:0,
          detail:[] ,
          getApibj:[],
          tabBarImgArr: [
          {normal: require('../../assets/images/fico1.png'), selected: require('../../assets/images/fico1a.png'),name: "首页",path: "/"},
        {normal: require('../../assets/images/xing.png'), selected: require('../../assets/images/xing2.png'),name: "收藏",path: "/shoucang"},
        {normal: require('../../assets/images/cart.png'), selected: require('../../assets/images/cart2.png'),name: "购物车",path: "/cart"},
          ]
        }
      },
      components: {
        Header
      },
      mounted(){
        this.getApibjdata();
        this.getindexdata();
      },
      methods:{
        getApibjdata(){
          this.$axios.get('https://gank.io/api/v2/categories/Girl').then(res=>{
            this.getApibj=res.data.data;
          })
        },
        getindexdata(){
          var id = this.$route.query.id;
          this.$axios.get('https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/10').then(res => {
              this.detail = res.data.data[id];
              console.log(this.detail)
          })
        },
        switchTo(path){
          this.$router.replace(path)
          console.log(this.$route.path)
        },
		
		//立即购买
		buyshop(){
			var params ={
			  total:1,
			  totalPrice:this.detail.views
			}
			console.log(params)
			this.$router.push({name:'Pay',params:params})
		},
		
		// 加入购物车
        addToShopCar(e){
			if (sessionStorage.getItem("token") == 'false') {
				alertInfo("请先登录后再操作!");
				setTimeout(()=>{
					this.$router.push({path:"/login"})
				},1000)
				return false;
			}
            let txt = e.target.innerText;
            if(txt == "加入购物车"){
                alertInfo("加入购物车成功!");
                this.$refs.btn.innerText = "已加入购物车"
                this.showcartnum = true
                this.$store.state.cartlength += 1;
                var goods={
                  id:this.$route.query.id,
                  price:this.detail.views,
                  nums:this.detail.title,
                  title:this.detail.desc,
                  img:this.detail.images,
                }
                var cartstr = JSON.stringify(goods);
                console.log(cartstr)
            }else{
                alertInfo("该商品已在购物车中!");
                return false
            }
        },
		
		//购物车
        Tocart: function(){
          this.$router.push({
            path: 'cart',
            query: {
              id:this.$route.query.id
            }
          })
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
  .vidtop h2{white-space: nowrap;overflow:hidden;text-overflow: ellipsis;margin-top: 5px;}
  .vidtop h3 p{line-height:28px;}
  .vidtop h3 p i{color: #f00;font-weight: bold;}
  .video img{width: 100%;height: 100%;}
  .videobot img{max-width: 100%; margin-top: 10px;}
  .bottom-tab{ width:7.5rem;height:60px;background-color: #fff;position:fixed;left:0;bottom:0;right: 0;margin: auto; display:flex;z-index:999;-webkit-box-shadow:2px 2px 5px #666; box-shadow:2px 2px 5px #666;}
  .tab-item{display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:14px;color:#666;width: 16%;position: relative;}
  .tab-item img{width:24px;height: 24px; margin-bottom:2px;}
  .bottom-tab span{white-space: nowrap;text-align: center;color: #333;}
  .cartimg{margin-left: 8px;position:relative;top: 4px;}
  .carttxt{position: relative;top: -2px;}
  .active{color:#4da7f3;}
  .tab-item:nth-child(1) .cartnum,.tab-item:nth-child(2) .cartnum{display: none;}
  .cartnum{width: 22px;height: 22px;line-height: 22px; text-align: center; background: #D24161;border-radius: 50%;position: absolute;top: 5px;right:10px;color: #fff;}
  .itemt{width: 26%;font-size: 16px;color: #fff;font-size: 14px;white-space: nowrap;}
  .cartbtn{background: #febd0b;}
  .buybtn{background: #D24161;}
  @import '../../assets/css/alertPopShow.css'
</style>
