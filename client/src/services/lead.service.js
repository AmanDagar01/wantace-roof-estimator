import api from "./api";

export const submitLead = async (payload) => {
  const response = await api.post("/leads", payload);

  return response.data.data;
};