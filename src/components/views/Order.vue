<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="我的订单">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="newsbox orderbox">
        <ul class="zililist">
            <li class="fix ordernum">
                <span>订单号：{{detail._id}}</span>
            </li>
            <li class="fix ordernum">订单时间<em class="right">{{detail.publishedAt}}</em></li>
            <li class="fix nobg">
                  <span class="left">课程名称</span>
                  <em class="right titles" v-if="detail.desc">{{detail.desc.slice(0,20)}}</em>
            </li>
            <li class="fix nobg">
                  <span class="left">培训价格</span>
                  <em class="right">¥ <i ref="price">{{detail.views}}</i></em>
            </li>
            <li class="fix nobg">
                  <span class="left">培训类别</span>
                  <em class="right">{{detail.type}}</em>
            </li>
            <li class="fix">
                  <span class="left">可购买时间</span>
                  <div class="sexbox">
                      <input type="text" v-model="timeValue" placeholder="请选择时间" readonly @click="showPopFn()">
                      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                        <van-datetime-picker v-model="currentDate" type="date" @change="changeFn()" @confirm="confirmFn()" @cancel="cancelFn()" />
                      </van-popup>
                  </div>
            </li>
            <li class="fix nobg">
                  <span class="left">课时</span>
                  <em class="right" v-if="detail.title">{{detail.title.replace(/[^0-9]/ig,"")}}节课</em>
            </li>
        </ul>
        <ul class="zililist">
            <li class="fix fpswitch">
                <span class="left">是否使用优惠券</span>
                <i class="yh" v-if="showyh">已优惠：{{youhui}}</i>
                <div class="fpselect right">
                    <dl class="switchdl">
                        <dt @click="changeSwitch(value)">
                            <input id="checked_2" type="checkbox" class="switch" v-model="ischecked" />
                            <label for="checked_2"></label>
                        </dt>
                    </dl>
                </div>
            </li>
            <li class="fix fpinfo">
                <span class="left">发票信息</span>
                <div class="sexbox">
                    <van-field
                      readonly
                      clickable
                      label=""
                      :value="value"
                      placeholder="请选择发票类型"
                      @click="showPicker = true"
                    />
                    <van-popup v-model="showPicker" round position="bottom">
                      <van-picker
                        show-toolbar
                        :columns="columns"
                        @cancel="showPicker = false"
                        @confirm="onConfirm"
                      />
                    </van-popup>
                </div>
            </li>
            <li class="fix fpxzli">
                <span class="left">发票地址选择</span>
                <div class="sexbox">
                     <choosect></choosect>
                </div>
            </li>
        </ul>
        <datemonth></datemonth>
        <div class="orderbtn">
            <span class="left">合计：<i>¥<b>{{totalPrice}}</b></i></span>
            <em class="right" @click="payorder">提交订单</em>
        </div>
    </div>

  </div>
</template>

<script>
  import Header from "../common/Header"
  import datemonth from "../common/datemonth"
  import choosect from "../common/choosect"
  import areaList from '../../assets/js/area.js'
  import { Toast } from "vant";

  export default {
      data () {
        return {
          detail:{},
          msg: '',
          currentDate: new Date(),
          changeDate: new Date(),
          show: false, // 用来显示弹出层
          timeValue: '',
          columns: ['增值税专用发票', '增值税普通发票', '机动车销售统一发票', '二手车销售统一发票', '货物运输业增值税专用发票'],
          showPicker: false,
          value: '',
          youhui:'',
          total:1,
          totalPrice:'',
          showyh:false,
          ischecked:false
        }
      },
      components: {
        Header,datemonth,choosect
      },
      mounted(){
        this.getkclist();
        this.timeFormat(new Date());
        //this.total = this.$refs.price.innerText;
      },
      methods:{
        getkclist() {
          var id = this.$route.query.id;
          this.$axios.get('https://gank.io/api/v2/data/category/Girl/type/Girl/page/5/count/10').then(res => {
              this.detail = res.data.data[id];
              console.log(this.detail)
              this.youhui = parseFloat(this.detail.views * 0.07).toFixed(2)
              this.totalPrice = parseFloat(this.detail.views).toFixed(2);
            })
            .catch(function(res) {});
        },
        changeSwitch(value){
          if(this.ischecked == false){
                this.showyh = true
                this.totalPrice = parseFloat(this.detail.views - this.youhui).toFixed(2);  
            }else{
                this.showyh = false
                this.totalPrice = parseFloat(this.detail.views).toFixed(2);
          }
        },
        showPopFn() {
          this.show = true;
        },
        showPopup() {
          this.show = true;
        },
        changeFn() { // 值变化是触发
          this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
        },
        confirmFn() { // 确定按钮
          this.timeValue = this.timeFormat(this.currentDate);
          this.show = false;
        },
        cancelFn(){
          this.show = true;
        },
        timeFormat(time) { // 时间格式化 2019-09-08
          let year = time.getFullYear();
          let month = time.getMonth() + 1;
          let day = time.getDate();
          return year + '年' + month + '月' + day + '日'
        },
        onConfirm(value) {
          this.value = value;
          this.showPicker = false;
        },
        payorder(){
          var cartParam ={
            total:this.total,
            totalPrice:this.totalPrice
          }
          this.$router.push({name:'Pay',params:cartParam})
        },
      }
    }
</script>

<style scoped>
  .orderbox{margin-top: 0.9rem;margin-bottom:60px;}
  .switchdl dt{float: right;}
  .titles{width: 70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: right;}
  .zililist li.fpxzli{border-bottom: 0;}
  .zililist li.fpxzli .sexbox{margin-right: 0;}
  .zililist li.fpinfo .sexbox{margin-right: 0;}
  .zililist li.fpinfo .van-cell{padding:0;border-bottom: 0;height: 44px;display: flex;align-items: center;}
  .zililist li.fpinfo .van-cell input{position: relative;top: 15px;}
  .yh{color: #f00;margin-left: 20px;}
  .zililist li.fpswitch .fpselect{width:2rem;}
</style>
