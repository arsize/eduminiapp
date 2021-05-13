var app = getApp()

Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        show: false
    },
    //options(Object)
    onLoad: function (options) {
        app.initTabBar(this, 'tourist', 1);
    },
    onReady: function () {

    },
    onShow: function () {
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