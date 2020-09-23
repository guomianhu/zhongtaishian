<template>
    <div class="head">
        <slot name="left"></slot>
        <p>{{title}}</p>
        <slot name="right"></slot>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                goBack:true,
                showname:false,
            }
        },
        props:{
            title:{
                type:String,
                default:'生活馆'
            }
        },
        mounted(){
        },
        methods:{
            back_history(){
              this.$router.go(-1);//返回上一层
            },
            login(){
                this.$router.push({ path: "/login", query:{activeIndex:1}});
            },
            register(){
                this.$router.push({ path: "/Register", query:{activeIndex:2}});
            },
        }
    }
</script>

<style scoped>
    .head{width:7.5rem;height: 0.8rem;line-height: 0.8rem;text-align: center;font-size: 0.3rem;position: fixed;left: 0;right: 0;top: 0;margin: auto;z-index:99;}
    .head span{width: 0.26rem;height: 0.42rem;position: absolute;left: 0.2rem;top: 0.19rem;background:url(../../assets/images/back.png) no-repeat;background-size: cover;}
    .head em{width: 0.38rem;height: 0.38rem;position: absolute;right: 0.2rem;top: 0.21rem;background:url(../../assets/images/gb.png) no-repeat;background-size: cover;}
    .head span a,.head em a{width: 100%;height: 100%;display: block;}
    .logindl{position: absolute;right: 10px;top: 0;}
    .logindl dt{float: left;margin-left: 10px;}
    .logindl dt i{margin-left: 10px;position: relative;top: -2px;}
</style>