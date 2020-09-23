<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="发票管理">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox">
        <div class="adpadding">
            <div class="fapiaobox">
                <h1>提示：按照国税总局通知，自2017年7月1日起，企业索取的增值税普通发票需
    填写纳税人识别号，不符合规定的发票，不得作为合法税收凭证。</h1>
                <h2 class="addfp"><router-link to="/addfapiao">添加发票</router-link></h2>
                <ul class="fapedit">
                  <li v-for="(item,index) in fplist" :key="index">
                    <div class="intxtdiv">
                        <input type="text" class="inptxt" ref="fptit" v-model="item.desc" readonly>
                        <div class="intxtdiv">
                            <span>识别码：</span><input type="text" class="nums" ref="fpnum" v-model="item._id" readonly>
                        </div>
                        <div class="edittxt" @click="modal11(index)">修改</div>
                        <Modal v-model="iSmodal" class-name="vertical-center-modal" title="修改发票" @on-ok="ok(index)"
        @on-cancel="cancel" :styles="{top: '30%'}">
                            <dl class="anserdl fix">
                                <dt class="fix">
                                    <span>发票抬头:</span>
                                    <input type="text" v-model="fptitle">
                                </dt>
                                <dt class="fix">
                                    <span>识别码:</span>
                                    <input type="text" v-model="fpid">
                                </dt>
                            </dl>
                        </Modal>
                    </div>
                  </li>
                </ul>
            </div>
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
          fplist:[],
          iSmodal: false,
          fptitle:'',
          fpid:'',
        }
      },
      components: {
        Header,Footer
      },
      mounted(){
        this.getlist();
      },
      methods:{
        modal11(index){
          this.iSmodal = !this.iSmodal;
          this.fptitle = this.fplist[index].desc;
          this.fpid = this.fplist[index]._id;
        },
        getlist() {
          this.$axios.get('https://gank.io/api/v2/random/category/GanHuo/type/Android/count/5').then(res => {
              console.log(res.data.data)
              this.fplist = res.data.data;
            })
            .catch(function(res) {});
        },
        ok(index){
            var title = this.fptitle;
            var num = this.fpid;
            console.log(index)
            this.fplist[index].desc = title;
            this.fplist[index]._id = num;
            this.$Message.success('发票信息修改成功');
        },
        cancel(){  
        },
      }
    }
</script>

<style scoped>
  .newsbox{margin-top: 0.8rem;margin-bottom:60px;}
  .ussrtop{padding-bottom: 30px;}
  .ksbtn{height: 1.2rem;line-height: 1.2rem; z-index: 9999;}
  .intxtdiv input.inptxt{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  .anserdl dt{height: 30px;line-height: 30px;margin: 10px 0;}
  .anserdl dt span{width: 60px;display: block;float: left;text-align: right;margin-right: 10px;}
  .anserdl dt input{width: calc(100% - 60px - 10px);float: left;border: 1px solid #e8eaec;border-radius: 5px;text-indent: 10px;color: #666;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
</style>
