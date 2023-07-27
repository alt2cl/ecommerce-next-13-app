import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [controller, setController] = useState(null);

  const ruta = process.env.NEXT_PUBLIC_STRAPI_URL + url;

  function request() {
    return fetch(ruta)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function handlePost(newData) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(newData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(ruta, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function handleCheckBymail(mailData) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(mailData);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      //body: raw,
      //redirect: "follow",
    };

    fetch(ruta, requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
    return data;
  }

  return {
    data,
    loading,
    error,
    //handleCancelRequest,
    //appendData,
    handlePost,
    request,
  };
}
