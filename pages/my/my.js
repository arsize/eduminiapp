var app = getApp()

Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        show: false
    },
    //options(Object)
    onLoad: function (options) {

    },
    onReady: function () {

    },
    onShow: function () {
        app.initTabBar(this, 3);
    },
    gototools() {
        wx.navigateTo({
            url: "/pages/settools/settools"
        })
    },
    showsfn() {
        this.setData({
            show: !this.data.show
        })
    }
});