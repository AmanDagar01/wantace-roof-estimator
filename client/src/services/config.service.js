import api from "./api";

export const getConfiguration = async () => {
  const response = await api.get("/config");

  return response.data.data;
};