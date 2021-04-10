Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        color: {
            type: String,
            value: '#333'
        },
        selectedColor: {
            type: String,
            value: '#1aad19'
        },
        backgroundColor: {
            type: String,
            value: ''
        },
        position: {
            type: String,
            value: 'bottom'
        },
        borderStyle: {
            type: String,
            value: '#ccc'
        },
        list: {
            type: Array,
            value: []
        }
    },

    data: {

    },

    methods: {
        gotoroute(e) {
            var route = e.currentTarget.dataset.set
            wx.reLaunch({
                url: route,
                success: (result) => {
                    console.log("路由跳转成功")

                },
                fail: (e) => {
                    console.log("路由跳转失败", e)
                },
                complete: (e) => { }
            });
        }

    }
})