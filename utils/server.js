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
                console.log('resx',res)
                if (loading) {
                    wx.hideLoading();
                }
                if (res.data.status == 200 || res.header['Content-Type'] == "image/jpeg") {
                    resolve(res.data);
                } else {
                    reject(res.data);
                    let ignoreCode = []
                    if (!ignoreCode.includes(res.data.status)) {
                        if (res.data.status == 1003 || res.data.status == 1015) {
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