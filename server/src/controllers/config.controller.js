const {
    getActiveConfiguration,
  } = require("../services/config.service");
  
  const getPublicConfiguration = async (req, res, next) => {
    try {
      const configuration =
        await getActiveConfiguration();
  
      res.status(200).json({
        success: true,
        data: configuration,
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    getPublicConfiguration,
  };