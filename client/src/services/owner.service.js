import api from "./api";

export const getOwnerConfiguration =
  async () => {
    const response =
      await api.get("/owner/config");

    return response.data.data;
  };

export const updateOwnerConfiguration =
  async (configuration) => {
    const response =
      await api.put(
        "/owner/config",
        configuration
      );

    return response.data.data;
  };

export const getOwnerLeads =
  async () => {
    const response =
      await api.get("/leads/owner");

    return response.data.data;
  };