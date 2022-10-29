import { useState } from "react";
import axios from "axios";
import { methods } from "@/util";
console.log({ methods });
function useFetch() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const getData = async (method, url, payload) => {
    console.log("i am in getData" + method, payload, url);
    switch (method) {
      case methods.GET:
        return await axios.get(url);
        break;
      case methods.POST:
        return await axios.post(url, payload);
        break;
      case methods.PUT:
        return await axios.put(url, payload);
        break;
      case methods.DELETE:
        return await axios.delete(url);
        break;

      default:
        return null;
        break;
    }
  };

  const invoke = async (method, url, payload = {}) => {
    setData("");
    setError("");
    setSuccess(true);
    try {
      console.log({ url });
      setLoading(true);
      let res = await getData(method, url, payload);

      setData(res.data);
      setSuccess(true);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccess(false);
      const customError = error.response?.data?.message || error.message;
      setError(customError);
      // if I will not throw an error, the code will continue
      // throw error;
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
