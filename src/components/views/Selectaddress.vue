<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="选择收获地址">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="zhifubox">
        <h1 class="zftit">请选择您的邮寄地址</h1>
        <div class="adpadding">
            <div class="fapiaobox">
                <h1 class="fix addresstits">
                  <span>提示：</span>
                  <em>收到发票后请核对信息，如需重新开具，请将正确开票信息与发票一同当月寄回，快递费自行承担。电话咨询：029-888888888</em>
                </h1>
                <h2 class="addfp"><router-link to="/Addaddress">添加地址</router-link></h2>
                <ul class="fapedit">
                  <li v-for="(item,index) in myData" :key="index">
                      <div class="intxtdiv">
                          <b ref="titleval">收获人：{{item.name}}</b>
                          <em>联系电话：{{item.phone}}</em>
                      </div>
                      <div class="intxtdiv">
                        <p>收货地址：{{item.address}}</p>
                      </div>
                      <div class="fix">
                          <label>
                            <div class="zfright">
                              <input type="radio" :id="'radio'+index" name="'checkbox">
                              <label :for="'radio'+index"></label>
                            </div><em class="mrtit">设为默认</em>
                          </label>
                          <span class="right">
                              <i @click="editinfo(index)">修改</i>
                              <i @click="Delect(index)">删除</i>
                          </span>
                      </div>
                      <Modal v-model="iSmodal" class-name="vertical-center-modal" title="修改收获地址信息" @on-ok="ok(index)"
        @on-cancel="cancel" :styles="{top: '30%'}">
                          <dl class="anserdl fix">
                              <dt class="fix">
                                  <span>收获人:</span>
                                  <input type="text" v-model="infoname">
                              </dt>
                              <dt class="fix">
                                  <span>联系电话:</span>
                                  <input type="text" v-model="infotel" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="11">
                              </dt>
                              <dt class="fix">
                                  <span>收货地址:</span>
                                  <input type="text" v-model="infocity">
                              </dt>
                          </dl>
                      </Modal>
                  </li>
                </ul>
                <div class="noshouc" v-show="nodata">暂无数据</div>
            </div>
        </div>
        <div class="zhifubtn"><a>确认</a></div>
    </div>

  </div>
</template>

<script>
  import { Dialog } from 'vant'
  import Header from "../common/Header"
    export default {
      data () {
        return {
          myData:[],
          adrname:'',
          adrtell:'',
          prov:'',
          city:'',
          district:'',
          detailadr:'',
          nodata:false,
          iSmodal: false,
          infoname:'',
          infotel:'',
          infocity:''
        }
      },
      components: {
        Header,
      },
      mounted(){
        this.getParams()
      },
      methods:{
        editinfo(index){
          this.iSmodal = !this.iSmodal;
          this.infoname = this.myData[index].name;
          this.infotel = this.myData[index].phone;
          this.infocity = this.myData[index].address;
        },
        getParams(){
            this.$axios.get('http://cangdu.org:8001/v1/users/51243/addresses').then(res=>{
              console.log(res.data);
              this.myData = res.data;
              this.adrname = this.$utils.getUrlKey("adrname")
              this.adrtell = this.$utils.getUrlKey("adrtell")
              this.prov = this.$utils.getUrlKey("prov")
              this.city = this.$utils.getUrlKey("city")
              this.district = this.$utils.getUrlKey("district")
              this.detailadr = this.$utils.getUrlKey("detailadr")
            })
        },
        Delect(index){
             let text = this.$refs.titleval[index].innerText;
             Dialog.confirm({
                  title: '确定要删除该条数据么?',
                  message: text
             }).then(() => {
                  this.myData.splice(index,1)
                  this.$Message.info('删除成功');
                  if(this.myData.length == 0){
                    this.nodata = true;
                  }
             }).catch(() => {
                  // on cancel
            });
         },
        ok(index){
            var name = this.infoname;
            var infotel = this.infotel;
            var infocity = this.infocity;
            this.myData[index].name = name;
            this.myData[index].phone = infotel;
            this.myData[index].address = infocity;
            this.$Message.success('收获地址信息修改成功');
        },
        cancel(){  
        },
      }
    }
</script>

<style scoped>
  .zhifubox{margin-top: 0.9rem;margin-bottom:60px;}
  .switchdl dt{float: right;}
  .intxtdiv{width: 100%;float: none;}
  .fapedit li .fix{width: 100%;float: none;margin-top: 10px;}
  .fapedit li .zfright{float: left;margin-top: 0;}
  .fapedit li .fix span i{margin-left: 20px;}
  .mrtit{padding-top: 3px;}
  .anserdl dt{height: 30px;line-height: 30px;margin: 10px 0;}
  .anserdl dt span{width: 60px;display: block;float: left;text-align: right;margin-right: 10px;}
  .anserdl dt input{width: calc(100% - 60px - 10px);float: left;border: 1px solid #e8eaec;border-radius: 5px;text-indent: 10px;color: #666;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
</style>
