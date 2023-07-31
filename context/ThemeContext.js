"use client";

import { createContext, useContext, useState, useEffect } from "react";
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must used within a provider");
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [dataTheme, setDataTheme] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/configtheme?populate=logosite`
      );
      const data = await response.json();
      // Aquí puedes realizar cualquier transformación o manipulación de los datos obtenidos
      // antes de establecerlos en el estado del contexto
      setDataTheme(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        dataTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
