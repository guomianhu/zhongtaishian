//小时
export const spikeHours = state => {
    return state.countdown.hours < 10 ? '0' + state.countdown.hours : state.countdown.hours;
  };
  
  //分钟
  export const spikeMinutes = state => {
    return state.countdown.minutes < 10 ? '0' + state.countdown.minutes : state.countdown.minutes;
  };
  
  //秒
  export const spikeSeconds = state => {
    return state.countdown.seconds < 10 ? `0${state.countdown.seconds}` : state.countdown.seconds;
  };