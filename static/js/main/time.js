var t = null;
t = setTimeout(time, 1000); //開始运行
function time() {
    clearTimeout(t); //清除定时器
    dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    var day = dt.getDate();
    var h = dt.getHours(); //获取时
    var m = dt.getMinutes(); //获取分
    var s = dt.getSeconds(); //获取秒
    document.getElementsByClassName('showTime_2')[0].innerHTML =
        "当前时间：" +
        y +
        "年" +
        mt +
        "月" +
        day +
        "日-" +
        h +
        "时" +
        m +
        "分" +
        s +
        "秒";
    var all = 24 * 3600;
    var begin = h * 3600 + m * 60 + s;
    var del = all - begin;
    h = parseInt(del / 3600);
    del -= h * 3600;
    m = parseInt(del / 60);
    del -= m * 60;
    s = del;
    document.getElementsByClassName('showTime')[0].innerHTML =
        "距离大数据刷新时间还剩：" + h + "小时" + m + "分钟" + s + "秒";
    t = setTimeout(time, 1000); //设定定时器，循环运行
}