const Lead = require("../models/Lead");

const createLead = async ({
  configuration,
  name,
  phone,
  email,
  answers,
  estimate,
}) => {
  const lead = await Lead.create({
    config_version: configuration.version,

    name: name.trim(),

    phone: phone.trim(),

    email: email.trim().toLowerCase(),

    answers,

    estimate_low: estimate.estimate_low,

    estimate_high: estimate.estimate_high,
  });

  return lead;
};

const getLeads = async () => {
  return Lead.find()
    .sort({
      captured_at: -1,
    })
    .lean();
};

module.exports = {
  createLead,
  getLeads,
};