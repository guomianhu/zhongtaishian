<template>
    <ul class="xuexiji">
        <li v-for="(item ,index) in list">
          <h1><span>{{item}}</span><a href="#">湖南省长沙市第一期食沙市第一从业培训班</a></h1>
            <h2>保健食品<i>|</i>食品从业人员<i>|</i>共15课时</h2>
            <h3>
              <span class="left">学习进度:<i>12/15</i></span>
                <em class="right"><a>点击查看></a></em>
            </h3>
        </li>
    </ul>
</template>
<script>
  export default{
     props:{
　　　　list:{
　　　　　　type:Array,//type为Array,default为函数
　　　　　　default(){
　　　　　　　　return [
　　　　　　　　　　""//默认初始值
　　　　　　　　]}}
　　　　},//用props属性进行传数据，此时子组件已经获取到list的数据了
       data(){
         return {
         }  
    },
} 
</script>

<style scoped>
  
</style>