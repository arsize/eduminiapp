import {
    globalData
} from "./global";
const API_BASE_URL = globalData.baseUrl;
// 接口封装
const HTTP = (options) => {
    let {
        url,
        methods,
        loading,
        data,
        type
    } = options

    let header = {
        'Accept-Language': "zh",
        "content-type": type ? type : "application/json"
    };
    let token = wx.getStorageSync("logindata").appToken;
    let language = wx.getStorageSync('language')
    if (language) {
        if (language == 'zh_CN') {
            header['Accept-Language'] = 'zh'
        } else if (language == 'en') {
            header['Accept-Language'] = 'en'
        }
    }

    if (token) {
        header.access_token = token;
    }
    if (loading) {
        wx.showLoading({
            title: "加载中",
            mask: true
        });
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: API_BASE_URL + url,
            header: header,
            method: methods,
            data: data,
            success: res => {
                if (loading) {
                    wx.hideLoading();
                }
                if (res.data.code == 200 || res.header['Content-Type'] == "image/jpeg") {
                    resolve(res.data);
                } else {
                    reject(res.data);
                    let ignoreCode = [0, 180002, 180003, 6023, 6001, 6004, 7008, 6012]
                    if (!ignoreCode.includes(res.data.code)) {
                        if (res.data.code == 1003 || res.data.code == 1015) {
                            // token失效
                            wx.reLaunch({
                                url: '/pages/loading/loading'
                            })

                        } else {
                            if (res.data.msg) {
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: "none",
                                    duration: 2000,
                                    mask: true
                                });
                            }

                        }

                    }

                }
            },
            fail: err => {
                if (loading) {
                    wx.hideLoading();
                }
                checkNetWorkStatu();
                wx.showToast({
                    title: "请稍后再试",
                    icon: "none",
                    duration: 2000,
                    mask: true
                });
                reject(err);
            }
        });
    });
};

// 判断是否有网络
const checkNetWorkStatu = function () {
    wx.getNetworkType({
        success: function (res) {
            let networkType = res.networkType;
            wx.hideLoading();
            console.log('networkType', networkType)
            if (networkType == "none") {
                wx.reLaunch({
                    url: "/pages/noNetwork/noNetwork"
                });
            } else if (networkType == "unknown") {
                wx.reLaunch({
                    url: "/pages/noNetwork/noNetwork"
                });
            } else { }
        }
    });
};

export {
    HTTP
};