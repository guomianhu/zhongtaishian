<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="学习记录">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="adpadding">
            <child :list="list"></child>
        </div>
    </div>

    <Footer></Footer>

  </div>
</template>

<script>

  import Header from "../common/Header"
  import Footer from "../common/Footer"
  import child from '../common/child'

    export default {
      data () {
        return {
          list:["生产领域","食品行业","其他"],
        }
      },
      components: {
        Header,Footer,child
      },
      mounted(){
        
      },
      methods:{
        changeName(newName){
            this.name = newName;
        },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
  .ksbtn{height: 1.2rem;line-height: 1.2rem; z-index: 9999;}
</style>
