import { HTTP } from "../../utils/server";
const app = getApp();
Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        inputval: '',
        checkSuccess: false,
        premobile: '',
        aftermobile: '',
        timeover: 60,
        timer: '',
        inputValue: "",
        cabitnetArr: ["", "", "", ""],
        focusIndex: 0,
        autofocus: true,
        cominType: ''
    },
    onLoad(options) {
        let premobile = options.mobile || ''
        let cominType = options.cominType
        let aftermobile = premobile.split("")
        aftermobile = aftermobile.map((item, index) => {
            if (index == 3 || index == 4 || index == 5 || index == 6) {
                return item = '*'
            } else {
                return item
            }
        })
        this.setData({
            cominType: cominType,
            premobile: premobile,
            aftermobile: aftermobile.join('')
        })
    },
    onHide() {
    },
    onUnload() {
        if (this.data.timer) {
            clearInterval(this.data.timer)
            this.setData({
                timeover: 60
            })
        }
    },
    restartget() {
        wx.showLoading({
            title: '请稍后',
        })

        let organizationId = wx.getStorageSync("logindata").organizationId;
        HTTP({
            url: 'verificationCode/sendChangeMobilePhoneSms',
            methods: 'post',
            data: {
                mobile: this.data.premobile,
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
            this.setData({
                timeover: 60
            })
            this.timeover()
        }, err => {
            wx.hideLoading()
        })

    },
    onShow() {
        this.timeover()
        this.setData({
            autofocus: true,
        })
    },
    // 手机号登录
    gotologin() {
        wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
        })
        setTimeout(() => {
            wx.reLaunch({
                url: "/pages/index/index"
            })
        }, 2000);

        return
        let logindata = wx.getStorageSync("logindata")
        HTTP({
            url: 'app/wx/mobileRegister',
            methods: 'post',
            data: {
                sessionKey: logindata.sessionKey,
                appId: app.globalData.appId,
                openId: logindata.openId,
                organizationId: logindata.organizationId,
                phone: this.data.premobile,
                checkCode: this.data.inputval
            }
        }).then(res => {
            wx.setStorageSync("logindata", res.data);
            wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
            })
            setTimeout(() => {
                if (this.data.cominType == "loading") {
                    wx.reLaunch({
                        url: '/pages/confirmRentMap/confirmRentMap?cominType=' + 'loading',
                    })
                } else {
                    wx.reLaunch({
                        url: "/pages/index/index"
                    })
                }

            }, 1000);
        }, err => {
            this.setData({
                cabitnetArr: ["", "", "", ""],
                focusIndex: 0,
                autofocus: true,
            })
        })
    },
    selectBlockItem(el) {
        let focusIndex = el.currentTarget.dataset.index;
        this.setData({
            focusIndex: focusIndex,
            autofocus: true,
        });
    },

    // 定时器
    timeover() {
        if (this.data.timer) {
            clearInterval(this.data.timer)
        }
        let time = setInterval(() => {
            if (this.data.timeover <= 1) {
                clearInterval(this.data.timer)
                this.setData({
                    timeover: 0
                })
                return
            }
            let temp = this.data.timeover - 1
            this.setData({
                timeover: temp
            })
        }, 1000);
        this.setData({
            timer: time
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
        if (!this.data.inputval) {
            wx.showToast({
                title: '请输入验证码',
                icon: 'none',
                duration: 2000
            })
            this.setData({
                checkSuccess: false
            })
        } else {
            this.setData({
                checkSuccess: true
            })
        }
    },
    isPhoneNumber(tel) {
        var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        return reg.test(tel);
    },
    // 隐私政策
    gotouseragreement() {
        wx.navigateTo({
            url: '/pages/myPolicy/myPolicy'
        })
    },
    delmobile() {
        this.setData({
            inputval: '',
            checkSuccess: false
        })

    },
    getfocus() {
        this.setData({
            autofocus: true,
        })
    },
    checkArrToStr(arr) {
        return arr.every((item) => {
            return item != "";
        });
    },
    inputchange(e) {
        let temp = e.detail.value;
        console.log('获得了input输入', temp)
        let tempArr = this.data.cabitnetArr;
        let tempfocusIndex = this.data.focusIndex;
        let focusIndex = 0;
        if (temp) {
            if (tempfocusIndex >= 3) {
                focusIndex = tempfocusIndex;
            } else {
                focusIndex = tempfocusIndex + 1;
            }
        } else {
            if (tempfocusIndex <= 0) {
                focusIndex = tempfocusIndex;
            } else {
                focusIndex = tempfocusIndex - 1;
            }
        }
        if (temp.length > 1) {
            tempArr[this.data.focusIndex] = temp.slice(this.data.focusIndex, this.data.focusIndex + 1)
        } else {
            tempArr[this.data.focusIndex] = temp
        }

        this.setData({
            inputValue: "",
        });
        this.setData({
            cabitnetArr: tempArr,
        });
        this.setData({
            focusIndex: focusIndex,
        });

        if (this.checkArrToStr(tempArr)) {
            this.setData({
                inputval: tempArr.join('')
            })
            this.gotologin()
            this.setData({
                autofocus: false,
            });
        }
    },
});