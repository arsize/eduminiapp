import { globalData } from "./utils/global";
const EventEmitter2 = require("./miniprogram_npm/eventemitter2/index").EventEmitter2;
const emitter = new EventEmitter2();
App({
    onLaunch: function () {
    },
    onHide: function () {
    },
    getModel: function () {
        //获取手机型号
        return this.globalData.sysinfo["model"];
    },
    getTabList: function () {
        var tabItemList = [{
            "selectedIconPath": "/images/icon_0_01.png",
            "iconPath": "/images/icon_0_01_gray.png",
            "pagePath": "/pages/index/index",
            "text": "首页",
            "selectedColor": "#013CBF",
            "active": true,
            "hidden": false
        },
        {
            "selectedIconPath": "/images/icon_0_02.png",
            "iconPath": "/images/icon_0_02_gray.png",
            "pagePath": "/pages/myclass/myclass",
            "text": "我的班级",
            "selectedColor": "#013CBF",
            "active": false,
            "hidden": false
        },
        {
            "selectedIconPath": "/images/icon_0_03.png",
            "iconPath": "/images/icon_0_03_gray.png",
            "pagePath": "/pages/message/message",
            "text": "消息",
            "selectedColor": "#013CBF",
            "active": false,
            "hidden": false
        },
        {
            "selectedIconPath": "/images/icon_0_04.png",
            "iconPath": "/images/icon_0_04_gray.png",
            "pagePath": "/pages/my/my",
            "text": "我的",
            "selectedColor": "#013CBF",
            "active": false,
            "hidden": false
        }
        ];
        return tabItemList;
    },
    initTabBar(app, activeIdx) {
        var tabItemList = this.getTabList();
        tabItemList.map(item => {
            item.active = false
        })
        tabItemList[activeIdx].active = true
        app.setData({ tabItemList })

        return
    },

    globalData: Object.assign(
        {
            emitter: emitter, //全局订阅函数
        },
        globalData
    )
});
