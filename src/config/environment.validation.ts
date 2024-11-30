import * as Joi from 'joi';

export default Joi.object({
  CLERK_SECRET_KEY: Joi.string().required(),
});
