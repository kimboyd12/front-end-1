import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
<<<<<<< HEAD
    //add base url
=======
    //add bagit pulse url
>>>>>>> 977b38bdf29835969bcac30a5a830726e1a59321
    baseURL: "https://water-my-plants-back-end1.herokuapp.com/",
    headers: {
      Authorization: token,
    },
  });
};
