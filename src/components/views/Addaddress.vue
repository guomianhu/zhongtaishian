<template>
  <div class="mainbox">

    <!--顶部导航-->
    <Header title="添加收获地址">
        <span slot="left" class="returnback"><a href="javascript:history.go(-1)"></a></span>
    </Header>

    <div class="zhifubox">
      <h1 class="zftit">地址信息</h1>
        <!-- <choosect></choosect> -->
        <van-address-edit
          :area-list="areaList"
          show-postal
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          @save="onSave"
          @delete="onDelete"
          @change-detail="onChangeDetail"
        />
    </div>

  </div>
</template>

<script>
import Header from "../common/Header"
import Footer from "../common/Footer"
import choosect from "../common/choosect"
import areaList from '../../assets/js/area.js'
import { Toast } from "vant";
export default {
  name: "Address",
  data() {
    return {
      areaList,
      searchResult: []
    };
  },
  components: {
        Header,Footer,choosect
    },
  methods: {
    onSave() {
      this.$router.push("/Selectaddress");
    },
    onDelete() {
      Toast("删除成功");
      this.$router.push("/Selectaddress");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "万达广场",
            address: "郑州市二七区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>

<style scoped>
  .zhifubox{margin-top: 0.9rem;margin-bottom:60px;}
  .cityselect{float: right;}
  .cityselect select{height:26px;line-height:26px;margin-left: 10px;}
  .fapedit{padding: 0 10px;}
  /*@import '../../assets/css/alertPopShow.css'*/
</style>
