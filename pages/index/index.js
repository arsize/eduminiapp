var app = getApp()

Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        banner_background: ['http://121.4.213.7/img/index_swiper_demo.jpg'],
        elements: [1, 2, 3, 4, 5],
        lineSwiper: ['全部作品', '人工智能', '奇思妙想', '生活妙招', '其他'],
        lineActived: 0
    },
    onShow() {
        app.initTabBar(this, 'tourist', 0);

    },
    gotosearch() {
        wx.navigateTo({
            url: "/pages/search/search"
        })
    }
});