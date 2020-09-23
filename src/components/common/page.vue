
<template>
    <div class="page-wrapper">
        <ul>
            <!-- <li class="paging-size">
                <select @change="getPageSize">
                    <option v-for="i in sizes" :value="i" :selected="i==pageSize">{{i}}</option>
                </select>
            </li> -->
            <li class="paging-item" v-if="current!=1" @click='jump(1)'>首页</li>
            <li class="paging-item" v-if="current-1>0" @click='jump(current-1)'>上一页</li>
            <li class="paging-item" v-if="current-2>0" @click='jump(current-2)'>{{current-2}}</li>
            <li class="paging-item" v-if="current-1>0" @click='jump(current-1)'>{{current-1}}</li>
            <li class="paging-item current" @click='jump(current)'>{{current}}</li>
            <li class="paging-item" v-if="total-current>1" @click='jump(current+1)'>{{current+1}}</li>
            <li class="paging-item" v-if="total-current>2" @click='jump(current+2)'>{{current+2}}</li>
            <li class="paging-item" v-if="total-current>1" @click='jump(current+1)'>下一页</li>
            <li class="paging-item" v-if="current!=total" @click='jump(total)'>尾页</li>
            <li class="paging-jump">
                <input type="text" v-model="jumpPage" :max="total" min="0"/>
                <input type="button" value="跳转"  @click='jump(jumpPage)'/>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                jumpPage:0
            }
        },
        props:{
            total:Number,
            current:Number,
            pageSize:Number,
            sizes:{
                type:Array,
                default:function(){
                    return [15,25,35]
                }
            }
        },
        mounted(){
            if(this.total-this.current>1){
                this.jumpPage=this.current+1;
            }
            else{
                this.jumpPage=1;
            }
        },
        watch:{
            current(){
                if(this.total-this.current>1){
                    this.jumpPage=this.current+1;
                }
                else{
                    this.jumpPage=1;
                }
            }
        },
        methods:{
            jump(index){
                index=Number(index);
                if (this.current != index && index > 0 && index < this.total + 1) {
                    this.$emit('jump', index);
                }
            },
            getPageSize(e){
                let pageSize=Number(e.target.value);
                this.$emit('getPageSize',pageSize);
            }
        }
    }
</script>

<style lang="less" scoped>
    @color:#1199F0;
    .page-wrapper{
        padding:20px 0;
        ul{
            overflow: hidden;
            display: table;
            margin: 0 auto;
            height: 50px;
            list-style: none;
            li{
                float:left;
            }
        }
        .paging-size{
            height:30px;
            margin-right:20px;
            select{
                width:50px;
                height:30px;
                text-align:center;
                border:1px solid @color;
            }
        }
        .paging-item{
            height: 30px;
            line-height: 30px;
            margin: 3px;
            padding-left:12px;
            padding-right:12px;
            border-radius: 5px;
            font-size: 12px;
            color: #666;
            cursor: pointer;
            &:hover,&.current{
                color:#fff;
                background-color: @color;
            }
        }
        .paging-jump{
            margin-left:10px;
            margin-top:3px;
            height:30px;
            font-size:0;
            overflow: hidden;
            input[type="number"]{
                float: left;
                padding:0 5px;
                width:50px;
                height:28px;
                text-align:center;
                border:1px solid @color;
            }
            input[type="button"]{
                float: left;
                padding:0 12px;
                height:30px;
                border:none;
                color:#fff;
                background-color: @color;font-size: 14px;
            }
            input[type="text"]{
              font-size: 14px;float: left;height: 30px;line-height: 30px;text-align: center; width: 30px;border: 1px solid #ccc;
            }
        }
    }
</style>