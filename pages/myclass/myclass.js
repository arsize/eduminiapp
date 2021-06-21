var app = getApp();

Page({
  data: {
    baseUrlImg: app.globalData.baseUrlImg,
    hasClass: true,
    classTypeOperate: [
      {
        title: "创建班级",
        img: "icon_30_06",
      },
      {
        title: "转让班级",
        img: "icon_30_07",
      },
      {
        title: "切换班级",
        img: "icon_30_08",
      },
    ],
    statisticsList: [
      {
        title: "预设人数",
        num: 50,
      },
      {
        title: "加入人数",
        num: 50,
      },
      {
        title: "家长数",
        num: 50,
      },
      {
        title: "加入率",
        num: 50,
      },
    ],
  },
  onLoad() {
    this.setTopBar();
    this.setBottomTab();
  },
  onShow: function () {},
  // 设置头部颜色
  setTopBar() {
    // let classList = [1,2,3]
    let classList = [];
    wx.hideHomeButton();
    if (classList.length > 0) {
      wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#163bb8",
      });
    } else {
      wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: "#013CBF",
      });
      wx.setNavigationBarTitle({
        title: "班级",
      });
    }
  },
  classOperate: function (e) {
    console.log("classOperate", e.currentTarget.dataset.index);
    switch (e.currentTarget.dataset.index) {
      case 0:
        this.joinCreateClass();
        break;
      case 1:
        wx.navigateTo({
          url: "/pages/myclassModule/transferClass/transferClass",
        });
        break;
      case 2:
        wx.navigateTo({
          url: "/pages/myclassModule/switchClass/switchClass",
        });
        break;
      default:
        break;
    }
  },
  joinCreateClass: function () {
    wx.navigateTo({
      url: "/pages/myclassModule/createClass/createClass",
    });
  },
  // 设置底部tap
  setBottomTab() {
    let logindata = wx.getStorageSync("logindata");
    if (logindata.isRegist == 1) {
      //   已登录
      app.initTabBar(this, "teacher", 1);
    } else {
      //   未登录
    }
  },

  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
});
