// pages/taskModule/taskListDetail/taskListDetail.js
import {
  getSubmitHomeWork
} from "../../../utils/server_api/task.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitTypeList: [{
        title: "已提交",
        value: 12
      },
      {
        title: "未提交",
        value: 122
      },
    ],
    activeType: 0,
    taskDetail: {
      classId: 90,
      count: null,
      createBy: 228,
      createTime: "2021-07-11 21:00:31",
      currPage: null,
      endTime: "",
      homeworkContent: "",
      homeworkId: 123,
      homeworkImgs: null,
      homeworkName: "2021年科技节",
      pageSize: 10,
      sort: null,
      sortName: null,
      startRow: 0,
      startTime: null,
      updateTime: "2021-07-11 21:00:31",

    },
    hasSubmitList:[],
    noSubmitList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("options", options);
    if(options.item){
      this.setData({
        taskDetail:JSON.parse(options.item)
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
    this.getSubmitHomeWorkOperate()
  },
  changeSubmitType(e) {
    console.log("e", e);
    this.setData({
      activeType: e.currentTarget.dataset.index
    })
  },

  async getSubmitHomeWorkOperate(){
    const loginData = wx.getStorageSync('logindata')
    const result = await getSubmitHomeWork({
      token: loginData.token,
      classId:this.data.taskDetail.classId,
      homeworkId:this.data.taskDetail.homeworkId,
      currentPage: 1,
      pageSize: 10

    })
    if (result.status !== 200) {
      this.setData({
        hasSubmitList:[],
        noSubmitList:[]

      })
      return;
    }

    this.data.submitTypeList[0].value = result.data?.hwSubmitCount ||0;
    this.data.submitTypeList[1].value = result.data?.unSubmitCount ||0;

    this.setData({
      hasSubmitList:result.data?.hwSubmit||[],
      noSubmitList:result.data?.unSubmit||[],
      submitTypeList:this.data.submitTypeList
    })
  },

  joinDetail(e) {
    const item = JSON.stringify(e.currentTarget.dataset.item);

    wx.navigateTo({
      url: `/pages/taskModule/singleTaskDetail/singleTaskDetail?item=${item}`
    })
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