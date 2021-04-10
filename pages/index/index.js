var app = getApp()

Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        banner_background: ['http://121.4.213.7/img/demo_swiper01.png'],
        elements: [1, 2, 3, 4, 5]
    },
    onShow() {
        app.initTabBar(this, 0);
    }
});