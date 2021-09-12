import {
  HTTP
} from "../server";

// 获取提交的作业和未提交作业学生信息
export const getSubmitHomeWork = (data) => {
  return HTTP({
    url: "homework/getSubmitHomeWork",
    methods: "get",
    data,
    loading: true,
    type: "application/x-www-form-urlencoded"
  });
};

// 提交评论
export const setComment = (data) => {
  return HTTP({
    url: "homework/setComment",
    methods: "post",
    data,
    loading: true,
    type: "application/x-www-form-urlencoded"
  });
};


// 提交作业
export const submitHomeWork = (data) => {
  return HTTP({
    url: "homework/submitHomeWork",
    methods: "post",
    data,
    loading: true,
  });
};

