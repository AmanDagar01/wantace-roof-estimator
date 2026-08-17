const Configuration = require("../models/Configuration");

const getActiveConfiguration = async () => {
  const configuration = await Configuration.findOne({
    is_active: true,
  }).lean();

  if (!configuration) {
    const error = new Error(
      "No active configuration found"
    );

    error.statusCode = 404;

    throw error;
  }

  return configuration;
};

const getConfigurationByVersion = async (version) => {
  const configuration = await Configuration.findOne({
    version,
  }).lean();

  if (!configuration) {
    const error = new Error(
      `Configuration version ${version} not found`
    );

    error.statusCode = 404;

    throw error;
  }

  return configuration;
};

module.exports = {
  getActiveConfiguration,
  getConfigurationByVersion,
};