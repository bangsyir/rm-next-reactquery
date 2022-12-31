import axios from "axios";

const appAxios = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export default appAxios;
