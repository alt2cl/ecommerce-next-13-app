import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

const Menu = ({ closedMenu }) => {
  //const datamenu = await getDataMenu();
  const [datamenu, setDataMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const values = useTheme();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/menus/?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setDataMenu(data);
        setLoading(false);
      });
  }, []);

  const datamenuMain = datamenu ? datamenu.data[0].attributes.items : null;

  if (loading) {
    return <p>Cargando menu</p>;
  }

  return (
    <div>
      {datamenuMain && (
        <ul
          className={`w-80 lg:w-auto ml-auto flex flex-col lg:flex-row max-w-7xl items-right justify-between p-4 lg:px-8 gap-10  text-white`}
          style={{
            color: values.dataTheme?.data.attributes.fontcolor
              ? values.dataTheme?.data.attributes.fontcolor
              : null,
          }}
        >
          {datamenuMain?.map((itemMenu) => {
            return (
              <li key={`main-menu-${itemMenu.id}`}>
                <Link href={itemMenu.url} onClick={() => closedMenu()}>
                  {itemMenu.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Menu;
