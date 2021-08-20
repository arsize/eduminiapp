import {
  HTTP
} from "../../utils/server";
var app = getApp()
Page({

  data: {
    username: '',
    message: ''
  },
  confirm() {

    HTTP({
      url: "/saveUserInfo",
      methods: "post",
      data: {}
    })

  }

})