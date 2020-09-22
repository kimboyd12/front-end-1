import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
<<<<<<< HEAD
=======
    //add base url
>>>>>>> 09dacb065a62e78c7534fb88dc9c483755a35ecd
    baseURL: "https://water-my-plants-back-end1.herokuapp.com/",
    headers: {
      Authorization: token,
    },
  });
};

export default axiosWithAuth;