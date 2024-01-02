import Image from "next/image";
import markdownToHtml from "@/src/utils/markdownToHtml";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { fetchStrapiData } from "@/src/lib/api";

export default async function PostPage({ params: { categoria } }) {
  //   const { data } = await fetchStrapiData(
  //     `pages/?filters[slug]=${dinamicpage}&populate=cover`
  //   );

  //const post = data?.data.length > 0 ? data?.data[0].attributes : null;
  console.log("parametro categoria", categoria);

  return false;
}
