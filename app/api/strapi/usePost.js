import { useState } from "react";
import axios from "axios";

export default function usePost(ruta) {
  const url = process.env.NEXT_PUBLIC_STRAPI_URL + ruta;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ data: [] });
  const [error, setError] = useState(null);

  const post = async (reqBody) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(url, reqBody);
      setData(res.data);
    } catch (err) {
      setError("A ocurrido un error");
    } finally {
      setLoading(false);
    }
  };

  return { post, data, loading, error };
}
