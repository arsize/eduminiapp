const app = getApp();
import {
    globalData
} from "../../utils/global";
import {
    HTTP
} from "../../utils/server";

Page({
    data: {
        baseUrlImg: app.globalData.baseUrlImg,
        token: "",
        userId: ""
    },
    onShow() {
        let logindata = wx.getStorageSync('logindata')
        let token = logindata.token
        let userId = logindata.userInfo.userId
        this.data.token = token
        this.data.userId = userId
    },
    loginout() {
        let that = this
        let option = {
            status: true,
            title: '退出登录',
            closeicon: true,
            content: `是否确认退出登录`,
            foot: [{
                text: '取消',
                cb: () => {}
            }, {
                text: `确定`,
                cb: () => {
                    that.realLogout()
                }
            }]
        }
        app.globalData.emitter.emit("dialogstatus", option)
    },
    realLogout(){
        HTTP({
            url: `wxLoginOut?token=${this.data.token}&&userId=${this.data.userId}`,
            methods: "post",
        }).then(res => {
            console.log('res', res)
            wx.showToast({
                title: `退出登录`,
                icon: 'success',
                duration: 2000
            })
            setTimeout(() => {
                wx.redirectTo({
                    url: "/pages/index/index"
                })
            }, 1000)

        })
    }
});