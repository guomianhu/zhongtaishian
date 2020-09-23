<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="师资团队">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">

        <ul class="index_szlist fix">
            <li v-for="(item,index) in indexteacher" :key="index" @click="linktoshow(item)">
                <div class="szpicimg" :style="{'background': 'url(' + item['images'] + ')','background-position':'center center','background-repeat':'no-repeat','background-size':'contain'}"></div>
                <div class="sztxt">
                    <h1>{{item.author}}</h1>
                    <h2>{{item.desc}}</h2>
                    <h3>{{item.title}}</h3>
                </div>
            </li>
        </ul>
        <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
    </div>

    <!--底部-->
    <Footer></Footer>

  </div>
</template>

<script>
  import Header from "../common/Header"
  import Footer from "../common/Footer"
  import Banner from "../common/Banner"
  import pagination from '../common/pagination'

    export default {
      data () {
        return {
          indexteacher:[],
          total: 15,     // 记录总条数
          display: 5,   // 每页显示条数
          current: 1, 
        }
      },
      components: {
        Header,Footer,Banner,
        'v-pagination': pagination,
      },
      mounted(){
        this.pagechange();
      },
      methods:{
        linktoshow(item){
            let params = {
                title: item.title,
                passtime: item.createdAt,
                image: item.images,
                author: item.author,
                desc: item.desc
            }
            this.$router.push({
                path: '/Newsshow',
                name: 'Newsshow',
                params:params
            })
        },
        pagechange:function(currentPage){
          console.log(currentPage);//该参数就是当前点击的页码数
          // ajax请求, 向后台发送 currentPage, 来获取对应的数据
          let url = `https://gank.io/api/v2/data/category/GanHuo/type/Android/page/${this.current}/count/${this.total}`
          this.$axios.get(url).then(res => {
              console.log(res.data.data)
              this.indexteacher = res.data.data;
            })
            .catch(function(res) {});
        },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top:1.2rem;background: #fff;padding:0 0.2rem;padding-bottom:90px;}
  .sztxt h1{white-space: nowrap;text-overflow: ellipsis;overflow:hidden;}
</style>
