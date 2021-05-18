var app = getApp()

Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        show: false,
        registered: ''
    },
    //options(Object)
    onLoad: function (options) {
        let logindata = wx.getStorageSync("logindata")
        let registered = false
        this.setData({
            registered: registered
        })
        if (!registered) {
            app.initTabBar(this, 'tourist', 1);
        }


    },
    onShow: function () {
    },
    gototools() {
        if (!this.data.registered) {
            wx.navigateTo({
                url: "/pages/login/login"
            })
        } else {
            wx.navigateTo({
                url: "/pages/settools/settools"
            })
        }

    },
    aboutus() {
        wx.navigateTo({
            url: "/pages/AboutUs/AboutUs"
        })
        

    },
    gotoregis() {
        wx.navigateTo({
            url: "/pages/login/login"
        })
    },
    showsfn() {
        this.setData({
            show: !this.data.show
        })
    }
});