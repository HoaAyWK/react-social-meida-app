const Joi = require("joi");

module.exports.signupValidation = (data) => {
    const signupSchema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return signupSchema.validate(data);
};

module.exports.signinValidation = (data) => {
    const signinSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return signinSchema.validate(data);
};
