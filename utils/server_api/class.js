import {
  HTTP
} from "../server";

// 获取班级列表
export const getAllClass = (data) => {
  return HTTP({
    url: "getAllClass",
    methods: "get",
    data,
    loading: true,
  });
};
// 创建班级
export const createClass = (data) => {
  return HTTP({
    url: "createClass",
    methods: "post",
    data,
    loading: true,
  });
};
// 加入班级
export const joinClass = (data) => {
  return HTTP({
    url: "joinClass",
    methods: "post",
    data,
    loading: true,
  });
};

// 获取作业列表
export const getClassHomeWork = (data) => {
  return HTTP({
    url: "homework/getClassHomeWork",
    methods: "get",
    data,
    loading: true,
  });
};