// pages/myclassModule/createClass/createClass.js
import {
  HTTP
} from "../../../utils/server";
import {
  createClass
} from "../../../utils/server_api/class";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    params: {
      className: "",
      // images:""
    },
    region: ["请选择省市区", "", ""],
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
      params: {
        ...this.data.params,
        [event.currentTarget.dataset.name]: event.detail.value,
      },
    });
  },
  uploadImg: function () {
    console.log("uploadImg");
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log("res:", res);
      },
    });
  },

  cancel: function () {
    wx.navigateBack({
      delta: 1,
    });
  },

  submit: function () {
    if (!this.data.params.className) {
      wx.showToast({
        title: "请输入班级名称",
        icon: "none",
        duration: 2000,
      });

      return;
    }
    this.createClass();
  },

  createClass: async function () {
    try {
      const loginData = wx.getStorageSync('logindata')
      const result = await createClass({
        ...this.data.params,
        token: loginData.token
      });
      if (result.data.status !== 200) {
        return;
      }
      wx.showToast({
        title: "创建成功",
        icon: "success",
        duration: 2000,
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        });
      }, 2000);
    } catch (error) {
      console.log("error", error);
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