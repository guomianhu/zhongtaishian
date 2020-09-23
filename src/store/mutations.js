
// 获取滚动图片
export const loadImg = (state, data) => {
    state.getindexbanner = data;
};

export const spikeimg = (state, data) =>{
    state.countdown = data[1];
}

// 倒计时
export const splikeTime = state => {
    state.countdown.seconds--;
    if (state.countdown.seconds === -1) {
      state.countdown.seconds = 59;
      state.countdown.minutes--;
      if (state.countdown.minutes === -1) {
        state.countdown.minutes = 59;
        state.countdown.hours--;
      }
    }
    if(state.countdown.hours == 0 && state.countdown.minutes == 0 && state.countdown.seconds == 0){
      //alert(22)
      //clearInterval(state.splikeTime);
    }
  };
