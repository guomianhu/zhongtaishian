<template>
    <div class="app">
      <van-cell is-link @click="showPopup" v-model="carmodel">
          <input type="text" placeholder="请选择" class="areainput" v-model="areaval">
      </van-cell>
      <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '50%' }">
          <van-area :area-list="areaList" :columns-num="3" ref="myArea" title="标题" @change="onChange" @confirm="onConfirm" @cancel="onCancel"/>
      </van-popup>
    </div>
</template>
<script>
    import Vue from 'vue'
    import areaList from '../../assets/js/area.js'
    import { Area, Popup } from 'vant'
    Vue.use(Area)
    Vue.use(Popup)
    export default {
    data() {
        return {
            areaList,
            show:false,
            carmodel:'',
            areaval:null
        }
    },
    methods:{
        // 弹出层显示
        showPopup() {
            this.show = true;
        },
        //value=0改变省，1改变市，2改变区
        onChange(picker, index, value){
            let val = picker.getValues();
            console.log(val)//查看打印
            let areaName = ''
            for (var i = 0; i < val.length; i++) {
                areaName = areaName+(i==0?'':'/')+val[i].name
            }
            this.carmodel = areaName
        },
        //确定选择城市
        onConfirm(val){
            var selectval = val[0].name+","+val[1].name+","+val[2].name;
            console.log(selectval)
            this.areaval = selectval;
            this.show = false//关闭弹框
        },
        //取消选中城市
        onCancel(){
             this.show = false
             this.$refs.myArea.reset()// 重置城市列表
        }

    }
}
</script>

<style>
  .app .van-cell{padding: 10px 0!important;}
  .areainput{padding-right: 20px;}
</style>
