import {
    HTTP
} from "../../utils/server";
var app = getApp()

Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        banner_background: ['http://121.4.213.7/img/index_swiper_demo.jpg'],
        elements: [1, 2, 3, 4, 5],
        lineSwiper: ['全部作品', '人工智能', '奇思妙想', '生活妙招', '其他'],
        lineActived: 0,
        regitst: null
    },
    onLoad() {
        this.checkLoginStatus().then(res => {
            this.checkRole(res.data)
        })
    },
    onShow() {
        let logindata = wx.getStorageSync('logindata')
        this.checkRole(logindata)
    },
    // 判断角色以及登录状态
    checkRole(logindata) {
        if (logindata.isRegist == 1) {
            // 已登录
            this.setData({
                regitst: true
            })
            let role = "teacher"
            if (role == 'teacher') {
                //角色是老师
                app.initTabBar(this, 'teacher', 0)
            }else if(role == 'students'){
                app.initTabBar(this, 'students', 0)
            }
        } else {
            // 未登录-游客
            this.setData({
                regitst: false
            })
            app.initTabBar(this, 'tourist', 0)

        }

    },
    checkLoginStatus() {
        return new Promise((resolve, reject) => {
            this.login().then(res => {
                resolve(res)
            }, err => {
                reject(err)
            })

        });
    },
    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    if (res.code) {
                        HTTP({
                            url: "wxLogin?code=" + res.code,
                            methods: "post",
                        }).then(login => {
                            wx.setStorageSync("logindata", login.data);
                            resolve(login)
                        })
                    }
                },
                fail: (err) => {
                    reject(err)
                },
            })
        })
    },
    gotosearch() {
        wx.navigateTo({
            url: "/pages/search/search"
        })
    },
    gotodetail() {
        wx.navigateTo({
            url: "/pages/projectdetail/projectdetail"
        })
    }
});