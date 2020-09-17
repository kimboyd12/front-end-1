import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    //add base url
    baseURL: "",
    headers: {
      Authorization: token,
    },
  });
};
