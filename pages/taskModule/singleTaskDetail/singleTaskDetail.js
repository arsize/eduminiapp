// pages/taskModule/singleTaskDetail/singleTaskDetail.js
import {
  setComment
} from "../../../utils/server_api/task.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    selectRateIndex: -1,

    rateList: ["A", "B", "C", "D", "E", "F"],
    form: {
      comment: "",
      selectRate: "",
    },
    taskDetail: {
      classId: 90,
      comment: "",
      commentNum: 0,
      count: null,
      createBy: 516,
      createTime: "2021-07-15 15:36:53",
      currPage: null,
      desc: 0,
      file: "",
      grade: "",
      headImg: null,
      homeworkId: 123,
      homeworkName: null,
      hwDescribe: "",
      hwFunc: "",
      hwImg: "http://47.119.158.29:9991/huima/5/2/6/2.jpg",
      hwsname: "",
      id: 676,
      inspiration: "",
      isCommented: 0,
      isOpen: 0,
      mp4: "",
      pageSize: 10,
      realName: null,
      showImg: "http://47.119.158.29:9991/huima/5/2/6/1.jpg",
      sort: null,
      sortName: null,
      startRow: 0,
      type: null,
      updateTime: "",
      userId: null,
      viewNum: 0,
      zanNum: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("options", options);
    if (options.item) {
      this.setData({
        taskDetail: JSON.parse(options.item)
      })
    }
    console.log(this.data.taskDetail);
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
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  selectRate(e) {
    const item = e.currentTarget.dataset.item;
    const index = e.currentTarget.dataset.index;
    console.log(item, index);
    this.setData({
      selectRateIndex: index,
      form: {
        ...this.data.form,
        selectRate: item,
      }
    })
  },

  bindKeyInput(event) {
    this.setData({
      form: {
        ...this.data.form,
        comment: event.detail.value,
      }
    });
  },

  submitOperate() {
    console.log("this.data.form", this.data.form);
    this.setCommentOperate()
  },

  async setCommentOperate() {

    const loginData = wx.getStorageSync('logindata')
    const result = await setComment({
      ...this.data.form,
      token: loginData.token
    });

    if (result.status === 200) {
      wx.showToast({
        title: "评论成功",
        icon: "success",
        duration: 2000,
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        });
      }, 2000);
    }

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