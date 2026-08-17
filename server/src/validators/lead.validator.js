const validateLeadInput = (body) => {
    const errors = [];
  
    if (
      !body.name ||
      typeof body.name !== "string" ||
      !body.name.trim()
    ) {
      errors.push("Name is required");
    }
  
    if (
      !body.phone ||
      typeof body.phone !== "string" ||
      !body.phone.trim()
    ) {
      errors.push("Phone is required");
    }
  
    if (
      !body.email ||
      typeof body.email !== "string" ||
      !body.email.trim()
    ) {
      errors.push("Email is required");
    }
  
    if (
      !body.answers ||
      typeof body.answers !== "object"
    ) {
      errors.push("Answers are required");
    }
  
    return errors;
  };
  
  module.exports = {
    validateLeadInput,
  };