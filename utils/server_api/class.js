import { HTTP } from "../server";

export const getAllClass = (data) => {
  return HTTP({
    url: "getAllClass",
    methods: "post",
    data,
    loading: true,
  });
};

export const createClass = (data) => {
  return HTTP({
    url: "createClass",
    methods: "post",
    data,
    loading: true,
  });
};
