const roundCurrency = (value) => {
    return Math.round(value);
  };
  
  const findQuestion = (configuration, key) => {
    return configuration.questions.find(
      (question) =>
        question.key === key &&
        question.active === true
    );
  };
  
  const findOption = (question, value) => {
    if (!question) {
      return null;
    }
  
    return question.options.find(
      (option) => option.value === String(value)
    );
  };
  
  const calculateEstimate = (configuration, answers) => {
    const roofAreaQuestion = findQuestion(
      configuration,
      "roof_area"
    );
  
    const materialQuestion = findQuestion(
      configuration,
      "material"
    );
  
    const pitchQuestion = findQuestion(
      configuration,
      "pitch"
    );
  
    const layersQuestion = findQuestion(
      configuration,
      "layers"
    );
  
    const storiesQuestion = findQuestion(
      configuration,
      "stories"
    );
  
    if (
      !roofAreaQuestion ||
      !materialQuestion ||
      !pitchQuestion ||
      !layersQuestion ||
      !storiesQuestion
    ) {
      const error = new Error(
        "Estimator configuration is incomplete"
      );
  
      error.statusCode = 500;
  
      throw error;
    }
  
    const roofArea = Number(answers.roof_area);
  
    if (!Number.isFinite(roofArea)) {
      const error = new Error(
        "Roof area must be a valid number"
      );
  
      error.statusCode = 400;
  
      throw error;
    }
  
    if (
      roofArea < roofAreaQuestion.min ||
      roofArea > roofAreaQuestion.max
    ) {
      const error = new Error(
        `Roof area must be between ${roofAreaQuestion.min} and ${roofAreaQuestion.max} sq ft`
      );
  
      error.statusCode = 400;
  
      throw error;
    }
  
    const materialOption = findOption(
      materialQuestion,
      answers.material
    );
  
    if (!materialOption) {
      const error = new Error(
        "Invalid material selection"
      );
  
      error.statusCode = 400;
  
      throw error;
    }
  
    const pitchOption = findOption(
      pitchQuestion,
      answers.pitch
    );
  
    if (!pitchOption) {
      const error = new Error(
        "Invalid pitch selection"
      );
  
      error.statusCode = 400;
  
      throw error;
    }
  
    const layersOption = findOption(
      layersQuestion,
      answers.layers
    );
  
    if (!layersOption) {
      const error = new Error(
        "Invalid roofing layers selection"
      );
  
      error.statusCode = 400;
  
      throw error;
    }
  
    const storiesOption = findOption(
      storiesQuestion,
      answers.stories
    );
  
    if (!storiesOption) {
      const error = new Error(
        "Invalid stories selection"
      );
  
      error.statusCode = 400;
  
      throw error;
    }
  
    /*
     * 1. Base material cost
     */
    const materialCost =
      roofArea * materialOption.rate_per_sqft;
  
    /*
     * 2. Waste factor
     */
    const materialWithWaste =
      materialCost *
      (1 + configuration.modifiers.waste_factor);
  
    /*
     * 3. Tear-off cost
     */
    const tearOffCost =
      roofArea *
      (layersOption.tear_off_per_sqft || 0);
  
    /*
     * 4. Subtotal
     */
    const subtotal =
      materialWithWaste + tearOffCost;
  
    /*
     * 5. Pitch multiplier
     */
    const pitchAdjusted =
      subtotal *
      (pitchOption.multiplier || 1);
  
    /*
     * 6. Stories multiplier
     */
    const storiesAdjusted =
      pitchAdjusted *
      (storiesOption.multiplier || 1);
  
    /*
     * 7. Permit fee
     */
    const finalCost =
      storiesAdjusted +
      configuration.modifiers.permit_flat_fee;
  
    /*
     * 8. Estimate range
     */
    const spread =
      configuration.modifiers.range_spread_pct / 100;
  
    const low =
      finalCost * (1 - spread);
  
    const high =
      finalCost * (1 + spread);
  
    return {
      base_material_cost: roundCurrency(
        materialCost
      ),
  
      waste_adjusted_material_cost:
        roundCurrency(materialWithWaste),
  
      tear_off_cost: roundCurrency(
        tearOffCost
      ),
  
      subtotal: roundCurrency(subtotal),
  
      final_cost: roundCurrency(finalCost),
  
      estimate_low: roundCurrency(low),
  
      estimate_high: roundCurrency(high),
    };
  };
  
  module.exports = {
    calculateEstimate,
  };