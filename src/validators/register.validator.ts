export { default as mw } from "./validator";

import Joi from "joi";

export const registerSchema = Joi.object({
  fullname: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
