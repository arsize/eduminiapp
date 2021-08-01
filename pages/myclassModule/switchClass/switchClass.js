// pages/myclassModule/switchClass/switchClass.js

import {
  getAllClass
} from "../../../utils/server_api/class";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getClassList();
  },

  async getClassList() {
    const loginData = wx.getStorageSync('logindata')
    try {
      const result = await getAllClass({
        token: loginData.token
      })
      if (result.status !== 200) {
        return;
      }

      this.setData({
        classList: result.data
      })

      joinClass(this.data.form);
    } catch (error) {

    }


  },

  switchClass(e) {
    const pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      currClassCont: e.currentTarget.dataset.item
    })

    wx.navigateBack({
      item: e.currentTarget.dataset.item
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})