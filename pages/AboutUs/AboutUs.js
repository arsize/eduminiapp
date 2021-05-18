// pages/AboutUs/AboutUs.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logindata: {},
    baseUrlImg: app.globalData.baseUrlImg,
    miniProgram: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      logindata: wx.getStorageSync("logindata")
    })
    const accountInfo = wx.getAccountInfoSync();
    if (app.globalData.appId == 'wxb965b629b07b30f7') {
      this.setData({
        miniProgram: app.globalData
      })
    } else {
      this.setData({
        miniProgram: accountInfo.miniProgram
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  ToContainer(e) {
    let flag = e.currentTarget.dataset.set;
    if (flag == 3) {
      // 用户协议
      wx.navigateTo({
        url: '/pages/myAgreement/myAgreement',
      });

    } else if (flag == 4) {
      //预付款协议
      wx.navigateTo({
        url: '/pages/premoneyAgreement/premoneyAgreement',
      });

    } else {
      wx.navigateTo({
        url: '/pages/publiContainer/publiContainer?flag=' + flag,
      });
    }
  },
  bindtel() {
    wx.makePhoneCall({
      phoneNumber: '4006002839'
    })
  },
})