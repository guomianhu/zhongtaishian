
//设置banner图片
export const getBan = ({commit}) => {
    return new Promise((resolve,reject)=>{
        // this.$axios.get(baseURL+"/api/ad").then(res=>{
        //     this.getindexbanner=res.data.data;
        // })
        // console.log(this.$axios)
        const data = [
            {img_url:'https://cn.paris-girafe.com/uploads/20200330/15855413239116.png'},
            {img_url:'https://cn.paris-girafe.com/uploads/20200330/15855413733551.png'},
            {img_url:'https://cn.paris-girafe.com/uploads/20200330/15855413985723.png'},
			{img_url:'https://cn.paris-girafe.com/uploads/20200330/15855410779142.png'},
        ];
        commit('loadImg',data);
    })
}

export const countdowntimes = ({commit}) => {
    return new Promise((resolve,reject) =>{
        const data = [
        ];
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const spikeTime = {
            hours: 0,
            minutes: 45,
            seconds: 60
        }
        commit("spikeimg",[data,spikeTime])
    })
}