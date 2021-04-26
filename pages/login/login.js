const app = getApp();
import {
    globalData
} from "../../utils/global";
Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        showRegistered: false,

    },
    //options(Object)
    onLoad: function (options) {

    },
    // 获取用户手机号
    getPhoneNumber(e) {
        if (e.detail.errMsg == "getPhoneNumber:ok") {
            this.registered(e.detail);
        } else {
            this.setData({
                showRegistered: true
            })
        }
    },
    gotomobile() {
        wx.navigateTo({
            url: '/pages/mobilelogin/mobilelogin',
        })
    },
    registered(detail) {
        HTTP({
            url: "/app/wx/wxRegisterMobile",
            methods: "post",
            data: {
                encryptedData: detail.encryptedData,
                iv: detail.iv,
                sessionKey: wx.getStorageSync("logindata").sessionKey,
                wxAppId: globalData.appId,
                openId: wx.getStorageSync("logindata").openId
            }
        }).then(res => {
            wx.setStorageSync("logindata", res.data);

            wx.showToast({
                title: `登录成功`,
                icon: 'success',
                duration: 2000
            })
            this.userLogin()

        })
    },
    // 用户登录
    userLogin() {
        wx.login({
            success: res => {
                if (res.code) {
                    HTTP({
                        url: "/app/wx/login",
                        methods: 'post',
                        data: {
                            code: res.code,
                            wxAppId: globalData.appId
                        }
                    }).then(login => {
                        if (login.data.status == 1) {
                            //用户是否被冻结
                            wx.navigateTo({
                                url: `/pages/freezeAccount/freezeAccount`
                            });
                            return;
                        }
                        wx.setStorageSync("logindata", login.data);
                        wx.reLaunch({
                            url: "/pages/index/index"
                        })


                    })
                }
            },
            fail: res => {
                console.log("fail:", res);
            }
        });
    },
});