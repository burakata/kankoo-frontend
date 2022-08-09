import axios from "axios";
import { env } from "process";

export default () => {
  //const token = localStorage.getItem("token");
 //http://localhost:3000
 //"https://kankoo-backend.herokuapp.com"
  return axios.create({
    baseURL:  "https://kankoo-backend.herokuapp.com",
    /*headers: {
      Authorization: token,
    },*/
  });
};
