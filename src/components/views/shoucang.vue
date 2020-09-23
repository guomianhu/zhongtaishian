<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="我的收藏">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="shoucangbg">
            <ul class="kcullist">
                <li v-for="(item,index) in indexkc" :key="index">
                    <div class="kctxt">
                        <h2 ref="titleval">{{item.desc}}</h2>
                        <h3>
                            <p><span>作者：{{item.author}}</span><i>|</i><span>{{item.category}}</span><i>|</i>共{{item.title.slice(1,3)}}课时</p>
                            <p><span>可购买时间：{{item.createdAt}}</span></p>
                        </h3>
                        <div class="vidbtn">
                            <span class="left"><b><i>¥</i>{{item.views}}.00</b></span>
                            <em class="right">
                                <a class="shanchu" @click="Delect(index)">删除</a>
                                <a class="publicbtn baoming" @click="paybuy(index,item.desc,item.author,item.category,item.title.slice(1,3),item.createdAt,item.views,item._id)">立即购买</a>
                            </em>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="noshouc" v-show="nodata">暂无数据</div>
        </div>
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
          indexkc:[],
          nodata:false,
        }
      },
      components: {
        Header,Footer
      },
      mounted(){
        this.getkclist();
      },
      methods:{
        getkclist() {
          this.$axios.get('https://gank.io/api/v2/data/category/Girl/type/Girl/page/5/count/10').then(res => {
              console.log(res.data.data)
              this.indexkc = res.data.data;
            })
            .catch(function(res) {});
        },
        Delect(index){
             let text = this.$refs.titleval[index].innerText;
             Dialog.confirm({
                  title: '确定要删除该条数据么?',
                  message: text
             }).then(() => {
                  this.indexkc.splice(index,1)
                  if(this.indexkc.length == 0){
                    this.nodata = true;
                  }
             }).catch(() => {
                  // on cancel
            });
        },
        paybuy(index,a,b,c,d,e,f,g){
            this.desc = a;
            this.author = b;
            this.category = c;
            this.title = d;
            this.createdAt = e;
            this.views = f;
            this._id = g;
            console.log(a)
            console.log(b)
            console.log(c)
            console.log(d)
            console.log(e)
            console.log(f)
            this.$router.push({path:'Order',query:{id:index}})
            console.log(this.$refs.titleval[index].innerText)
        },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
  .ksbtn{height: 1.2rem;line-height: 1.2rem; z-index: 9999;}
</style>
