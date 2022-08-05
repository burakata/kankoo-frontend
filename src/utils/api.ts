import axios from "axios";

export default () => {
  //const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://kankoo-backend.herokuapp.com",
    /*headers: {
      Authorization: token,
    },*/
  });
};
