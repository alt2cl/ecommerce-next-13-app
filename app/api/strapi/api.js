export const fetchDataFromApi = (url) => {
    return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${url}`)
    .then(response => response.json())
    .catch(error => console.log('Error fetching data:', error));
};




export const handlePost = (data, endpoint) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(data);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${endpoint}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}