import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// interceptor: funcion tipo middleware que, cada vez que el servidor nos de una respuesta, la captura y nos devuelve, directamente, el resultado que quiero y espero
/* client.interceptors.response.use((response) => response.data); */
// Esto quiere decir: cuando reciba la respuesta, toma la respuesta y devuelveme solo la data

// guardar el accessToken en la cabecera de las peticiones que hagamos
export const setAuthorizationHeader = (accessToken: string) => {
  client.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
};

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers["Authorization"];
};
