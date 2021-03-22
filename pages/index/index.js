//Page Object
Page({
    data: {
        switch: false
    },
    switchBtn() {
        this.setData({
            switch: !this.data.switch
        })

    }
});