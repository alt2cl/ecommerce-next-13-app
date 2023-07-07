import useSWR from "swr";
import axios from "axios";

export const useGetPostsSlider = () => {
  //const fetcher = (url) => axios.get(url).then((res) => res.data);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const ruta = `${process.env.NEXT_PUBLIC_STRAPI_URL}/destacados-portadas?populate=imagen`;

  const { data, error } = useSWR(ruta, fetcher);

  return {
    data,
    error,
  };
};
