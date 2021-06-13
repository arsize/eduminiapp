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
    gotologin() {
        wx.login({
            success: res => {
                if (res.code) {
                    HTTP({
                        url: "wxLogin?code=" + res.code,
                        methods: 'post',
                    }).then(res => {
                        wx.setStorageSync("logindata", res.data);
                        wx.showToast({
                            title: `登录成功`,
                            icon: 'success',
                            duration: 2000
                        })
                        setTimeout(() => {
                            wx.reLaunch({
                              url: '/pages/index/index',
                            })
                        }, 2000);
                    })
                }
            }
        })
    },
    // 获取用户手机号
    getPhoneNumber(e) {
        if (e.detail.errMsg == "getPhoneNumber:ok") {
            this.registered(e.detail);
            console.log(e.detail)
        } else {
            this.setData({
                showRegistered: true
            })
        }
    },
    registered(detail) {
        HTTP({
            url: `regist`,
            methods: "post",
            data: {
                encryptedData: detail.encryptedData,
                iv: detail.iv,
                openId: wx.getStorageSync("logindata").openId,
                sessionKey: wx.getStorageSync("logindata").sessionKey
            }
        }).then(res => {
            console.log('resgus', res)
            wx.setStorageSync("logindata", res.data);

            this.gotologin()

        })
    }
});