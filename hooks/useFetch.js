import { useState } from "react";
import axios from "axios";
import { methods } from "@/util";
console.log({ methods });
function useFetch(url = "/") {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const getData = async (method, param, payload) => {
    console.log("i am in getData" + method, param, payload, url);
    switch (method) {
      case methods.GET:
        return await axios.get(url + "" + param);
        break;
      case methods.POST:
        return await axios.post(url + "" + param, payload);
        break;
      case methods.PUT:
        return await axios.put(url + "" + param, payload);
        break;
      case methods.DELETE:
        return await axios.delete(url + "" + param);
        break;

      default:
        return null;
        break;
    }
  };

  const invoke = async (method, param = "", payload = {}) => {
    setData("");
    setError("");
    setSuccess(true);
    try {
      console.log({ url });
      setLoading(true);
      let res = await getData(method, param, payload);

      setData(res.data);
      setSuccess(true);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccess(false);
      setError(error.response);
      throw error;
    }
  };

  const resetFetch = () => {
    setData("");
    setLoading(false);
    setError("");
    setSuccess(false);
  };
  return { data, resetFetch, loading, error, success, invoke };
}
export default useFetch;
