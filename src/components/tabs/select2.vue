
<template>  
  <div class="jifencot" slot='select02'>
  		<ul class="zhshulist fix">
	        <li class="swiper-slide" v-for="(item,index) in getApiBan" :key="index">
	          <h1><img :src="item.image"></h1>
	          <h3>{{item.title}}</h3>
	        </li>
	    </ul>
  </div>  
</template> 

<script>  
export default {  
  data(){  
    return{
    	getApiBan:[],
    }  
  },
  mounted(){
  	this.getBan();
  },
  methods:{
  	getBan(){
      this.$axios.get('https://gank.io/api/v2/banners').then(res=>{
        this.getApiBan=res.data.data;
      })
    },
  }  
}  
</script> 

<style scoped>
  .adpadding{padding-top:0;}
  .zhshulist li h1{height: auto;}
  .zhshulist li:nth-child(3){margin-top: 0.2rem;}
  .zhshulist li:nth-child(2) h1{height: 4.92rem;margin-bottom: 0.3rem;}
</style>
