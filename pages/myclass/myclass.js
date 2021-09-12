var app = getApp();
import {
  globalData
} from "../../utils/global";
import {
  getAllClass,
  getClassHomeWork
} from "../../utils/server_api/class";
Page({
  data: {
    baseUrlImg: app.globalData.baseUrlImg,
    loading:false,
    hasClass: true,
    classTypeOperate: [{
        title: "创建班级",
        img: "icon_30_06",
      },
      // {
      //   title: "转让班级",
      //   img: "icon_30_07",
      // },
      {
        title: "加入班级",
        img: "icon_30_07",
      },
      {
        title: "切换班级",
        img: "icon_30_08",
      },
    ],
    statisticsList: [{
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
      // {
      //   title: "加入率",
      //   num: 50,
      // },
    ],
    currClassCont: {},
    homeWorkList: []
  },
  onLoad(e) {
    this.setTopBar();
    this.setBottomTab();
    if (Object.keys(this.data.currClassCont).length == 0) {
      this.getClassList()

    }
  },
  onShow: function (e) {
    const pages = getCurrentPages();
    console.log("pages", pages);
    console.log("currClassCont", this.data.currClassCont);
    if (Object.keys(this.data.currClassCont).length) {
      this.getClassHomeWorkList(this.data.currClassCont.classId)
    }


  },
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

  async getClassList() {
    const loginData = wx.getStorageSync('logindata')
    try {
      const result = await getAllClass({
        token: loginData.token

      })
      if (result.status !== 200) {
        this.setData({
          hasClass: false
        })

        return;
      }
      if (result.data.length) {
        const currItem = result.data[0];
        this.setData({
          hasClass: true,
          currClassCont: currItem
        })
        this.getClassHomeWorkList(currItem.classId)

      } else {
        this.setData({
          hasClass: false
        })
      }
      this.setData({
        loading:true
      })
    } catch (error) {

    }


  },

  async getClassHomeWorkList(classId) {
    try {
      const loginData = wx.getStorageSync('logindata')
      const result = await getClassHomeWork({
        token: loginData.token,
        classId,
        currentPage: 1,
        pageSize: 10

      })
      if (result.status !== 200) {
        this.setData({
          homeWorkList: []
        })
        return;
      }
      this.setData({
        homeWorkList: result.data
      })
    } catch (error) {

    }


  },

  classOperate: function (e) {

    switch (e.currentTarget.dataset.index) {
      case 0:
        this.joinCreateClass();
        break;
      case 1:
        // pages/myclassModule/joinClass/joinClass
        wx.navigateTo({
          // url: "/pages/myclassModule/transferClass/transferClass",
          url: "/pages/myclassModule/joinClass/joinClass",
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
  joinTask(e) {
    console.log("joinTask", e);
    // const item = JSON.stringfy(e.currentTarget.dataset.item);
    const item = JSON.stringify(e.currentTarget.dataset.item);

    wx.navigateTo({
      url: `/pages/taskModule/taskListDetail/taskListDetail?item=${item}`
    })
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