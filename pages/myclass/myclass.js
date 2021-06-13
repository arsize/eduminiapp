var app = getApp()

Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
    },
    onLoad() {
        this.setTopBar()
        this.setBottomTab()

    },
    onShow: function () {
      

    },
    // 设置头部颜色
    setTopBar() {
        // let classList = [1,2,3]
        let classList = []
        wx.hideHomeButton()
        if (classList.length > 0) {
            console.log('hhh')
            wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#163bb8',
            })
        } else {
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff',
            })
            wx.setNavigationBarTitle({
                title: '班级',
            })

        }
    },
    // 设置底部tap
    setBottomTab(){
        
          let logindata = wx.getStorageSync('logindata')
          if(logindata.isRegist == 1){
            //   已登录
              app.initTabBar(this, 'teacher',1);
          }else{
            //   未登录
            
          }
    },
    gotologin() {
        wx.navigateTo({
            url: '/pages/login/login',
        });
    },
    //item(index,pagePath,text)
    onTabItemTap: function (item) {

    }
});