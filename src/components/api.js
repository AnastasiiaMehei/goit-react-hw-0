import axios from "axios";
axios.defaults.baseURL = "https://api.unsplash.com";
export const getImages = async (topic, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: "-7i_jnQlSjDuNkJ4shZWckNEJtBVks9schHspWR86Vg",
      query: topic,
      page: currentPage,
    },
  });
  return response.data.hits;
};
