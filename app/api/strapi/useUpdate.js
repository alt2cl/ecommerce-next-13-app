import { useState } from "react";
import axios from "axios";

export default function useUpdate(ruta) {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL + ruta;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ data: [] });
  const [error, setError] = useState(null);

  const update = async (reqBody) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(url, reqBody);
      setLoading(false);
      setData(res.data);
      return res.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return { update, data, loading, error };
}
