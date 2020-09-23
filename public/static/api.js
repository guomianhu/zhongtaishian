(function (doc, win) {
    var docEl = doc.documentElement, //html
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize', //事件名称
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            }
            else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    recalc();
})(document, window);

window.apiObj = {
  apiUrl:'http://www.dkstu.cn',
}
var baseURL = window.apiObj.apiUrl;

window.apiObj2 = {
  apiUrl2:'http://123.207.32.32:8000',
}
var baseURL2 = window.apiObj2.apiUrl2;

window.apiObj3 = {
  apiUrl3:'http://www.murangj.cn/phonejk',
}
var baseURL3 = window.apiObj3.apiUrl3;

window.apiObj4 = {
  apiUrl4:'https://api.apiopen.top',
}
var baseURL4 = window.apiObj4.apiUrl4;