const Joi = require("joi");

// Common email regex (Joi email method already does this, but we can enhance)
const emailValidation = Joi.string().email({ tlds: { allow: ["com", "net", "org", "in"] } }).required();

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must be at most 30 characters",
    }),
    email: emailValidation.messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must be at most 20 characters",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(409).json({ success: false, message: error.details[0].message });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: emailValidation.messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must be at most 20 characters",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(409).json({ success: false, message: error.details[0].message });
  }
  next();
};

// Donor / Recipient validation is very similar, so we can make a common function
const userCardValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: emailValidation,
    blood_group: Joi.string().min(2).max(3).required(),
    age: Joi.number().min(1).max(100).required(),
    city: Joi.string().min(2).max(20).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(409).json({ success: false, message: error.details[0].message });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
  donarValidation: userCardValidation,
  recipientValidation: userCardValidation,
};
