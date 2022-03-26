export { default as mw } from "./validator";

import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
