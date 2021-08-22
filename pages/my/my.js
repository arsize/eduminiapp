var app = getApp()

Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        show: false,
        registered: '',
        message:"",
        userInfo:null
    },
    onLoad: function (options) {
       
    },
    onShow: function () {
        let logindata = wx.getStorageSync("logindata")
        this.setData({
            registered: logindata.isRegist,
            userInfo:logindata.userInfo
        })
        this.setBottomBar()
    },
    setBottomBar(){
        wx.hideHomeButton()
        if(this.data.registered == 1){
          //   已登录
            app.initTabBar(this, 'teacher',3);
        }else{
          //   未登录
          app.initTabBar(this, 'tourist',1);
        }
    },
    gototools() {
        if (!this.data.registered) {
            wx.navigateTo({
                url: "/pages/login/login"
            })
        } else {
            wx.navigateTo({
                url: "/pages/settools/settools"
            })
        }

    },
    aboutus() {
        wx.navigateTo({
            url: "/pages/AboutUs/AboutUs"
        })


    },
    gotoregis() {
        wx.navigateTo({
            url: "/pages/login/login"
        })
    },
    showsfn() {
        this.setData({
            show: !this.data.show
        })
    }
});