// pages/myclassModule/transferClass/transferClass.js
import { isPhoneNumber } from "../../../utils/util";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  onInput: function (event) {
    this.setData({
      phone: event.detail.value,
    });
  },
  cancel: function () {
    wx.navigateBack({
      delta: 1,
    });
  },

  submit: function () {
    if (!isPhoneNumber(this.data.phone)) {
      wx.showToast({
        title: "请输入正确的手机号码",
        icon: "none",
        duration: 2000,
      });

      return;
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
