import Link from "next/link";
// import useFetch from "../../../app/api/strapi/useFetch";
import { fetchStrapiData } from "@/src/lib/api";

// const getPost = (id) => {
//   return fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_URL}/products?filters[slug]=${id}&populate=*`,
//     { cache: "no-store" }
//   ).then((res) => res.json());
// };

export default async function Menu({ closedMenu }) {
  //const datamenu = await getDataMenu();
  //const [datamenu, setDataMenu] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  //const values = useTheme();

  const { data: datamenutop } = await fetchStrapiData(
    `menus?filters[title][$eq]=top&populate=*`
  );

  // const { datamenu, loadingmenu, errormenu } = useFetch(
  //   `${process.env.NEXT_PUBLIC_STRAPI_URL}/menus?filters[title][$eq]=top&populate=*`
  // );

  console.log("datamenuesss: ", datamenutop.data[0].attributes.items);

  const arraymenues = datamenutop.data[0].attributes.items;

  // useEffect(() => {
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_STRAPI_URL}/menus?filters[title][$eq]=top&populate=*`
  //   )
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Error en la respuesta de la red");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log("data del menu", data);
  //       setDataMenu(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Hubo un problema con la petición fetch:", error);
  //       // Aquí puedes actualizar el estado para mostrar un mensaje de error en la UI
  //       setError(true);
  //       setLoading(false);
  //     });
  // }, [datamenu]);

  // const datamenuMain = datamenu ? datamenu.data[0].attributes.items : null;

  //return false;

  return (
    <div>
      {arraymenues && (
        <ul
          className={`w-80 lg:w-auto ml-auto flex flex-col lg:flex-row max-w-7xl items-right justify-between p-4 lg:px-8 gap-10  text-white`}
        >
          {arraymenues.map((itemMenu) => {
            return (
              <li key={`main-menu-${itemMenu.id}`}>
                <Link href={itemMenu.url}>{itemMenu.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
