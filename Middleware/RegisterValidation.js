const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
  });

  const { error } = Schema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message, error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
  });

  const { error } = Schema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message, error });
  }
  next();
};


const donarValidation = (req, res, next) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    blood_group: Joi.string().min(2).max(3).required(),
    age: Joi.number().min(1).max(100).required(),
    city: Joi.string().min(2).max(20).required(),
  });

  const { error } = Schema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message, error });
  }
  next();
};

const recipientValidation = (req, res, next) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    blood_group: Joi.string().min(2).max(3).required(),
    age: Joi.number().min(1).max(100).required(),
    city: Joi.string().min(2).max(20).required(),
  });

  const { error } = Schema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message, error });
  }
  next();
};


module.exports = { signupValidation, loginValidation , donarValidation , recipientValidation};
