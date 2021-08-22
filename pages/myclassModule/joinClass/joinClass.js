// pages/myclassModule/joinClass/joinClass.js
import {
  isPhoneNumber
} from "../../../utils/util";
import {
  joinClass
} from "../../../utils/server_api/class";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    form: {
      className: "",
      classCode: "",
    },
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

  onInput: function (e) {
    console.log("e", e.currentTarget.dataset.text);
    console.log("e", e.detail.value);

    this.setData({
      form: {
        ...this.data.form,
        [e.currentTarget.dataset.text]: e.detail.value,

      }
    });
  },
  cancel: function () {
    wx.navigateBack({
      delta: 1,
    });
  },

  submit: function () {
    console.log("this.data.form", this.data.form);
    if (!this.data.form.className || !this.data.form.classCode) {
      wx.showToast({
        title: "需输入加入班级名称和口令",
        icon: "none",
        duration: 2000,
      });

      return;
    }

    this.joinClass();
  },
  async joinClass() {
    try {
      const loginData = wx.getStorageSync('logindata')

      const result = await joinClass({
        ...this.data.form,
        token: loginData.token
      });

      if (result.status === 200) {
        wx.showToast({
          title: "加入成功",
          icon: "success",
          duration: 2000,
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          });
        }, 2000);
      }
    } catch (error) {}
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