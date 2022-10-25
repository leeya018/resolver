import { useState } from "react";
import axios from "axios";

function useFetch(url = "/") {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fetch = async (param = "") => {
    setData("");
    setError("");
    setSuccess(true);
    try {
      console.log({ url });
      setLoading(true);
      const res = await axios.get(url + "" + param);
      setData(res.data);
      setSuccess(true);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccess(false);

      //   setError("An error occurred. Awkward..");
      setError(error.response.data);
      throw error;
    }
  };

  const send = async (payload = {}, param = "") => {
    setLoading(true);
    setSuccess(false);
    setData("");
    setError("");
    try {
      console.log({ url });
      const res = await axios.post(url + "" + param, payload);
      console.log({ item: res.data });
      setData(res.data);
      setSuccess(true);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log(error.response.data);

      setLoading(false);
      setSuccess(false);
      setError(error.response.data);

      throw error;
    }
  };

  const resetFetch = () => {
    setData("");
    setLoading(false);
    setError("");
    setSuccess(false);
  };
  return { data, fetch, resetFetch, send, loading, error, success };
}
export default useFetch;
