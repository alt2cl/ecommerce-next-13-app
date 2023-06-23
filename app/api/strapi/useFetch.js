import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(param) {
  const [data, setData] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(process.env.NEXT_PUBLIC_STRAPI_URL + param)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("An error occurred. Awkward..");
        setLoading(false);
      });
  }, [param]);
  //console.log("valor data:", data);
  //const exists = data.data.filter((item) => item.id === param).length > 0;
  return { data, loading, error };
}

export default useFetch;
