const app = getApp();
import {
    globalData
} from "../../utils/global";
import {
    HTTP
} from "../../utils/server";
Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
    },
    onLoad: function (options) {

    },
    gotologin() {
        wx.login({
            success: res => {
                if (res.code) {
                    console.log(res.code)
                    // HTTP({
                    //     url: "login/getOpenId?code=" + res.code,
                    //     methods: 'post',
                    // }).then(res => {
                    //     console.log('xxxx', res)
                    // })
                }
            }
        })
    },
    // 获取用户手机号
    getPhoneNumber(e) {
        if (e.detail.errMsg == "getPhoneNumber:ok") {
            // this.registered(e.detail);
            console.log(e.detail)
        } else {
            this.setData({
                showRegistered: true
            })
        }
    },
});