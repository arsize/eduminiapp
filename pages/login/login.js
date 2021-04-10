const app = getApp();
import {
    globalData
} from "../../utils/global";
Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,

    },
    //options(Object)
    onLoad: function (options) {

    },
    gotomobile() {
        wx.navigateTo({
            url: '/pages/mobilelogin/mobilelogin',
        })
    }
});