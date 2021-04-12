var app = getApp()

Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
    },
    //options(Object)
    onLoad: function (options) {

    },
    onShow: function () {
        app.initTabBar(this, 1);
    },
    gotologin() {
        wx.navigateTo({
            url: '/pages/login/login',
        });
    },
    //item(index,pagePath,text)
    onTabItemTap: function (item) {

    }
});