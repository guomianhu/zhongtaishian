<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="关于我们">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <ul class="vid_tit fix">
            <li v-for="(tab ,index) in tabs" :class="{active:iscur==index}" @click="iscur=index,tabChange('select' + (index + 1))">{{tab.name}}</li>
        </ul>
        <div class="adpadding mtop30">
            <keep-alive>   
                <component v-bind:is="tabView"></component>  
            </keep-alive>
        </div>
    </div>

    <!--底部-->
    <Footer></Footer>

  </div>
</template>

<script>

  import Header from "../common/Header"
  import Footer from "../common/Footer"
  import select1 from "@/components/tabs/select1";
  import select2 from "@/components/tabs/select2"
  import select3 from "@/components/tabs/select3"

    export default {
      data () {
        return {
          tabView: 'select1',
          iscur: 0,   
          tabs: [{name: "机构介绍"}, {name: "企业资质"} ,{name: "联系我们"}]
        }
      },
      components: {
        Header,Footer,select1,select2,select3
      },
      mounted(){
        
      },
      methods:{
        tabChange:function(tab){  
          this.tabView = tab;  
        },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
  .ksbtn{height: 1.2rem;line-height: 1.2rem; z-index: 9999;}
</style>
