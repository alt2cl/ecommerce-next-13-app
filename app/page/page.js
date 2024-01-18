import Image from "next/image";
import markdownToHtml from "@/src/utils/markdownToHtml";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { fetchStrapiData } from "@/src/lib/api";
import { notFound } from "next/navigation";

export default async function PostPage() {
  return (
    <div>
      <h2>Page</h2>
    </div>
  );
}
