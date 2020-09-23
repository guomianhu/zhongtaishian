<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="订单支付">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <CantantSelect v-model="cantinfo" v-on:paramsChange="getSubComponentParams"></CantantSelect>

    <div class="zhifubox">
      <h1 class="zftit">请选择您的支付方式</h1>
        <ul class="zflist">
            <li class="radio-box fix" v-for="(item,index) in radios" :key="index" @click="check(index)">
                <label class="zfleft">
                    <b>{{item.label}}</b>
                    <i></i>
                    <span class="radio" :class="{'on':item.isChecked}"></span>
                    <input type="radio" class="input-radio" v-model="payType" :value="item.value" :checked='item.isChecked'>
                </label>
            </li>
        </ul>
        <Modal v-model="iSmodalwx" class-name="vertical-center-modal" title="微信支付" @on-ok="ok()"
        @on-cancel="cancel" :styles="{top: '16%'}">
            <div class="payimg">
                <h1><img src="../../assets/images/wx.jpg"></h1>
                <h3>￥:{{$route.params.totalPrice}}</h3>
                <h4>微信扫码支付</h4>
            </div>
        </Modal>
        <Modal v-model="iSmodalzfb" class-name="vertical-center-modal" title="支付宝支付" @on-ok="ok()"
        @on-cancel="cancel" :styles="{top: '16%'}">
            <div class="payimg">
                <h1><img src="../../assets/images/zfb.jpg"></h1>
                <h3>￥:{{$route.params.totalPrice}}</h3>
                <h4>支付宝扫码支付</h4>
            </div>
        </Modal>
        <Modal v-model="iSmodalline" class-name="vertical-center-modal" title="线下支付" @on-ok="ok()"
        @on-cancel="cancel" :styles="{top: '30%'}">
            <div class="payimg">
                <p>线下支付可通过第三方支付平台、银联卡、境外卡支付等方式支付</p>
                <h3><span>需要支付</span>￥:{{$route.params.totalPrice}}<span>元</span></h3>
            </div>
        </Modal>
        <div class="zftxtxt">共<span>{{$route.params.total}}</span>件商品,需支付金额<span>{{$route.params.totalPrice}}</span>元</div>
        <div class="zhifubtn" @click="payOrder"><a>确认支付</a></div>
    </div>

  </div>
</template>

<script>
  import Header from "../common/Header"
  import CantantSelect from "../common/CantantSelect"

    export default {
      data () {
        return {
          cantinfo:'',
          FPayType:'微信支付',
          payType: '微信支付',
          radios:[
            {
              label: '微信支付',
              value:'微信支付',
              isChecked: true,
            },
            {
              label: '支付宝支付',
              value:'支付宝支付',
              isChecked: false,
            },
            {
              label: '线下支付',
              value:'线下支付',
              isChecked: false,
            },
          ],
          iSmodalwx: false,
          iSmodalzfb: false,
          iSmodalline: false,
        }
      },
      components: {
        Header,CantantSelect
      },
      mounted(){
        this.getSubComponentParams();
        this.loadData();
      },
      methods:{
        getSubComponentParams(params){
            //接收来自子组件的参数params
            this.cantinfo = params;
            console.log(this.cantinfo)
        },
        
        check(index) {
          console.log(index)
          // 先取消所有选中项
          this.radios.forEach((item) => {
            item.isChecked = false;
          });
          //再设置当前点击项选中
          this.payType = this.radios[index].value;
          // 设置值，以供传递
          this.radios[index].isChecked = true;
          console.log(this.payType);
        },
        loadData(){
            // 设置一进来的支付方式
            this.payType = this.FPayType
            if(this.FPayType === "微信支付"){
              this.$set(this.radios[0],'isChecked',true)  
              this.$set(this.radios[1],'isChecked',false)
              this.$set(this.radios[2],'isChecked',false)  
            }else{
              this.$set(this.radios[0],'isChecked',false)  
              this.$set(this.radios[1],'isChecked',false)
              this.$set(this.radios[2],'isChecked',false)  
            }
        },
        payOrder(){
          if(this.cantinfo == ''){
              if(this.payType == '微信支付'){
                this.iSmodalwx = true;
              }
              if(this.payType == '支付宝支付'){
                this.iSmodalzfb = true;
              }
              if(this.payType == '线下支付'){
                this.iSmodalline = true;
              }
          }else{
            this.$Message.error('请选择联系人或收货地址')
          }
        },
        ok(index){
            this.$Message.success('请调用支付接口');
        },
        cancel(){  
        },
      }
    }
</script>

<style scoped>
  .zhifubox{margin-bottom:60px;}
  .zhifubtn{z-index: 999;height: 60px;line-height: 60px;}
  .zfleft{width: 100%;}
  .zflist li b{line-height: 32px; margin-left: 10px;}
  .input-radio {display: inline-block;position: absolute;opacity: 0;width: 20px;height: 20px;cursor: pointer;outline: none;-webkit-appearance: none;}
  .radio{display: inline-block;width: 20px;height: 20px;vertical-align: middle;cursor: pointer;border:1px solid #ccc;border-radius: 50%; float: right;margin-top: 5px;}
  .on {background:url(../../assets/images/duih.png) no-repeat #0064ff center center;background-size: 12px 7px;}
  .payimg{text-align: center;}
  .payimg h1{width: 180px;height: 150px;margin: auto;}
  .payimg h1 img{width: 100%;height: 100%;}
  .payimg h3{color: #f00;line-height: 30px;font-size: 24px;font-weight: bold;margin: 10px 0;}
  .payimg h3 span{color: #000;font-size: 14px;font-weight: normal;}
  .payimg h4{width: 120px;height: 36px;line-height: 36px;margin:auto; background: #dfa11d;color: #fff;border-radius: 4px;}
</style>
