const Configuration = require("../models/Configuration");

const getActiveConfiguration =
  async () => {
    return Configuration.findOne({
      is_active: true,
    }).lean();
  };

const createNewVersion =
  async (changes) => {
    const current =
      await getActiveConfiguration();

    if (!current) {
      const error = new Error(
        "No active configuration exists"
      );

      error.statusCode = 404;

      throw error;
    }

    const nextVersion =
      current.version + 1;

    const newConfiguration = {
      version: nextVersion,

      business: {
        ...current.business,
        ...(changes.business || {}),
      },

      questions:
        changes.questions ||
        current.questions,

      modifiers: {
        ...current.modifiers,
        ...(changes.modifiers || {}),
      },

      is_active: true,
    };

    await Configuration.updateMany(
      {
        is_active: true,
      },
      {
        $set: {
          is_active: false,
        },
      }
    );

    const created =
      await Configuration.create(
        newConfiguration
      );

    return created;
  };

module.exports = {
  getActiveConfiguration,
  createNewVersion,
};