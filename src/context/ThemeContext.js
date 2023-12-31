"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const useFetchThemeData = () => {
  const [dataTheme, setDataTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/configtheme?populate=logosite`
      );
      const data = await response.json();
      setDataTheme(data);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { dataTheme, isLoading, error, setDataTheme };
};

export const ThemeProvider = ({ children }) => {
  const { dataTheme, isLoading, error, setDataTheme } = useFetchThemeData();

  const updateTheme = (newTheme) => {
    setDataTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ dataTheme, isLoading, error, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
