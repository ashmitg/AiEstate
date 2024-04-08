import axios from "axios";
import { constant } from "../constant";

const useSendApi = () => {

  const sendApi = async (url, data) => {
    try {

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(constant.baseUrl + url, data, {
        headers: { authorization: token },
      });
      if(response.status===200){
        return { data: response.data, error: false };
      }else{
        throw new Error("unable to fetch api")
      }
    } catch (error) {

        console.error("Error fetching API:", error);
      return { data: null, error: true };
    }
  };
  return sendApi;
};

export default useSendApi;
