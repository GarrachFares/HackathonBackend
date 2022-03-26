import { RequestHandler } from "express"
import Joi from "joi"

const validator = (schema: Joi.ObjectSchema<any>) => {
    const mw: RequestHandler = (req, res, next) => {
    
        const validate = schema.validate(req.body)
        if (validate.error)
            return res.status(400).send(validate.error.message)
        else next()
    }
    return mw
}

export default validator