import appAxios from "./axios";

export const getCharacters = async (page:number) => {
  const res = await appAxios.get(`/character?page=${page}`);
  return res.data;
};