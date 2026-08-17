const {
    getActiveConfiguration,
    createNewVersion,
  } = require("../services/owner-config.service");
  
  const getOwnerConfiguration =
    async (req, res, next) => {
      try {
        const configuration =
          await getActiveConfiguration();
  
        if (!configuration) {
          const error = new Error(
            "No active configuration found"
          );
  
          error.statusCode = 404;
  
          throw error;
        }
  
        res.status(200).json({
          success: true,
          data: configuration,
        });
      } catch (error) {
        next(error);
      }
    };
  
  const updateConfiguration =
    async (req, res, next) => {
      try {
        const configuration =
          await createNewVersion(req.body);
  
        res.status(201).json({
          success: true,
          data: configuration,
        });
      } catch (error) {
        next(error);
      }
    };
  
  module.exports = {
    getOwnerConfiguration,
    updateConfiguration,
  };