export const fetchStrapiData = async (url) => {
  // Inicializar variables de estado
  let loading = true;
  let error = null;
  let data = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/${url}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(
        `La llamada a la API falló con el estado: ${response.status}`
      );
    }

    data = await response.json();
  } catch (err) {
    console.error("La obtención de datos falló:", err);
    error = err;
  } finally {
    loading = false;
  }

  // Retornar los estados
  return { loading, error, data };
};
