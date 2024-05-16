import axios from "axios";
axios.defaults.baseURL = "https://api.unsplash.com";
export const getImages = async (topic) => {
  const response = await axios.get(
    `/search/photos?client_id=-7i_jnQlSjDuNkJ4shZWckNEJtBVks9schHspWR86Vg&query=${topic}`
  );
  return response.data.hits;
};
