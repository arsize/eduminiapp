//Page Object

import { HTTP } from "../../utils/server";

//获取应用实例
const app = getApp();
Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        inputval: '',
        checkSuccess: "hide",
        autofocus: true,
        cominType: ''
    },
    onLoad(options) {
        let cominType = options.cominType
        this.setData({
            cominType: cominType,
            autofocus: true
        })

    },
    inputval(val) {
        let mobile = val.detail.value
        this.setData({
            inputval: mobile
        })
        this.checkInputVal()

    },
    checkInputVal() {
        if (this.data.inputval) {
            if (this.isPhoneNumber(this.data.inputval)) {
                this.setData({
                    checkSuccess: 'active'
                })
            } else {
                this.setData({
                    checkSuccess: 'hide'
                })
                if (this.data.inputval.length >= 11) {
                    wx.showToast({
                        title: '手机号码格式错误，请重新输入',
                        icon: 'none',
                        duration: 2000
                    })
                }

            }
        } else {
            this.setData({
                checkSuccess: 'hide'
            })
        }
    },
    checkInputSubmit() {
        if (this.data.inputval) {
            if (this.isPhoneNumber(this.data.inputval)) {

            } else {
                wx.showToast({
                    title: '请输入正确格式的手机号',
                    icon: 'none',
                    duration: 2000
                })
            }
        } else {
            wx.showToast({
                title: '请输入手机号',
                icon: 'none',
                duration: 2000
            })
        }
    },
    isPhoneNumber(tel) {
        var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        return reg.test(tel);
    },
    getVerification() {
        let organizationId = wx.getStorageSync("logindata").organizationId;
        if (!this.isPhoneNumber(this.data.inputval)) {
            wx.showToast({
                title: '请输入正确格式的手机号',
                icon: 'none',
                duration: 2000
            })
            return
        }
        let cmstime = wx.getStorageSync('cmstime')
        if (cmstime && (new Date().getTime() - cmstime) < 60 * 1000) {
            wx.showToast({
                title: '操作过于频繁，请60s后再试',
                icon: 'none',
                duration: 2000
            })
            return
        }
        wx.showLoading({
            title: '请稍后',
        })
        this.setData({
            checkSuccess: 'loading'
        })
        wx.redirectTo({
            url: `/pages/checkverification/checkverification?mobile=${this.data.inputval} & cominType=${this.data.cominType}`
        })
        return
        HTTP({
            url: '',
            methods: 'post',
            data: {
                mobile: this.data.inputval,
                type: 1,
                organizationId: organizationId
            }
        }).then(res => {
            wx.hideLoading()
            wx.showToast({
                title: "验证码已发送",
                icon: 'success',
                duration: 2000
            })
            wx.setStorageSync("cmstime", new Date().getTime());
            setTimeout(() => {
                if (this.data.cominType == "loading") {
                    wx.redirectTo({
                        url: `/pages/checkverification/checkverification?mobile=${this.data.inputval} & cominType=${this.data.cominType}`
                    })
                } else {
                    wx.redirectTo({
                        url: `/pages/checkverification/checkverification?mobile=${this.data.inputval}`
                    })
                }

            }, 1000);

        }, err => {

        })
    },
    // 法律条款与隐私政策
    gotouseragreement() {
        wx.navigateTo({
            url: '/pages/myPolicy/myPolicy'
        })
    },
    delmobile() {
        this.setData({
            autofocus: true
        })
        this.setData({
            inputval: '',
            checkSuccess: "hide"

        })

    }
});