const {
    getActiveConfiguration,
  } = require("../services/config.service");
  
  const {
    calculateEstimate,
  } = require("../services/estimator.service");
  
  const {
    createLead,
  } = require("../services/lead.service");
  
  const {
    validateLeadInput,
  } = require("../validators/lead.validator");
  
  const submitLead = async (req, res, next) => {
    try {
      const errors = validateLeadInput(req.body);
  
      if (errors.length > 0) {
        const error = new Error(
          errors.join(", ")
        );
  
        error.statusCode = 400;
  
        throw error;
      }
  
      const configuration =
        await getActiveConfiguration();
  
      const estimate = calculateEstimate(
        configuration,
        req.body.answers
      );
  
      const lead = await createLead({
        configuration,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        answers: req.body.answers,
        estimate,
      });
  
      res.status(201).json({
        success: true,
  
        data: {
          lead_id: lead._id,
  
          config_version:
            configuration.version,
  
          estimate: {
            low: estimate.estimate_low,
            high: estimate.estimate_high,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    submitLead,
  };