// 时间格式化
const formats = function (format, timeStamp) {
    if (typeof timeStamp == "string") {
        timeStamp = timeStamp.replace(/-/g, "/");
    }
    let date = new Date(timeStamp);
    let dateStr = format;
    if (/yyyy/i.test(dateStr)) {
        dateStr = dateStr.replace(/yyyy/gi, date.getFullYear());
    } else if (/yy/i.test(dateStr)) {
        dateStr = dateStr.replace(/yy/gi, date.getFullYear() % 100);
    }
    if (/MM/.test(dateStr)) {
        let mon = date.getMonth() + 1;
        dateStr = dateStr.replace(/MM/g, mon > 9 ? mon : "0" + mon);
    } else if (/M/) {
        dateStr = dateStr.replace(/M/g, date.getMonth() + 1);
    }
    if (/dd/i.test(dateStr)) {
        let day = date.getDate();
        dateStr = dateStr.replace(/dd/gi, day > 9 ? day : "0" + day);
    } else if (/d/i.test(dateStr)) {
        dateStr = dateStr.replace(/dd/gi, date.getDate());
    }
    if (/hh/i.test(dateStr)) {
        let h = date.getHours();
        dateStr = dateStr.replace(/hh/gi, h > 9 ? h : "0" + h);
    } else if (/h/i.test(dateStr)) {
        dateStr = dateStr.replace(/h/gi, date.getHours());
    }
    if (/mm/.test(dateStr)) {
        let mm = date.getMinutes();
        dateStr = dateStr.replace(/mm/g, mm > 9 ? mm : "0" + mm);
    } else if (/m/.test(dateStr)) {
        dateStr = dateStr.replace(/m/g, date.getMinutes());
    }
    if (/ss/i.test(dateStr)) {
        let ss = date.getSeconds();
        dateStr = dateStr.replace(/ss/gi, ss > 9 ? ss : "0" + ss);
    } else if (/s/i.test(dateStr)) {
        dateStr = dateStr.replace(/s/gi, date.getSeconds());
    }
    return dateStr;
};

// 补零函数
function doHandleZero(zero) {
    var date = zero;
    if (zero.toString().length == 1) {
        date = "0" + zero;
    }
    return date;
}

// 获取每个月一号
const getDateOne = function () {
    var myDate = new Date();
    var tYear = myDate.getFullYear();
    var tMonth = myDate.getMonth();
    tMonth = doHandleZero(tMonth + 1);

    return tYear + "-" + tMonth + "-01";
};

// 把双字节的替换成两个单字节的然后再获得长度
const getBLen = function (str) {
    if (str == null) return 0;
    if (typeof str != "string") {
        str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "01").length;
};

// 判断是否为正数
const positiveNum = value => {
    let reg = /^\d+(?=\.{0,1}\d+$|$)/;
    if (reg.test(value)) return true;
    return false;
};

// 判断是否为小数
const checkDigit = value => {
    var reg = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
    if (reg.test(value)) return true;
    return false;
};

// 判断有几位小数
const pointNum = function (value) {
    isNaN(value) ? false : "";
    let currValue = parseFloat(value);
    let num = value.toString().split(".")[1].length;
    return num;
};

// 节流函数
const throttle = function (fn, gapTime) {
    let _lastTime = null;
    return () => {
        let _nowTime = +new Date();
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn();
            _lastTime = _nowTime;
        }
    };
};
// 秒转化成时分秒 || 分转化为时分秒
const formateSeconds = function (endTime) {
    //分钟转换为秒
    let result = parseInt(endTime * 60);
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

    let res = '';
    // if(h !== '00') res += `${h}h`;
    // if(m !== '00') res += `${m}min`;
    // res += `${s}s`;
    res += `${h}:`;
    res += `${m}:`;
    res += `${s}`;
    return res;
}

const formateNowTimer = function () {
    let date = new Date();
    let Months = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; //月份从0开始，因此要+1
    let Dates = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let Seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    let now = date.getFullYear() + '.' + Months + '.' + Dates + ' ' + Hours + ':' + Minutes + ':' + Seconds;
    return now;
    console.log(now) //2020-04-14 10:24:01
}

export {
    formats,
    getDateOne,
    getBLen,
    positiveNum,
    checkDigit,
    pointNum,
    throttle,
    formateSeconds,
    formateNowTimer
};