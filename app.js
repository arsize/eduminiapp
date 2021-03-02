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

    globalData: Object.assign(
        {
            emitter: emitter, //全局订阅函数
        },
        globalData
    )
});
