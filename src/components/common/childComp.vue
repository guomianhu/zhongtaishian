<template>
    <div>{{parentMsg}}</div>
</template>

<script>
export default{
    data(){
        return {
            parentMsg:'我是子组件的值'
        }
    },
    methods:{
        getMsg(msg){
            this.parentMsg = msg;
        }
    }
}
</script>

<style scoped>
  
</style>