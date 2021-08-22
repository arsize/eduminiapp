import {
  HTTP
} from "../server";

// 获取提交的作业和未提交作业学生信息
export const getAllClass = (data) => {
  return HTTP({
    url: "homework/getSubmitHomeWork",
    methods: "get",
    data,
    loading: true,
  });
};
