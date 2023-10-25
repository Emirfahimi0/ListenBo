import { RequestHandler } from "express";
import { isEmpty } from "../utils";
import * as yup from "yup";

export const validatorAuth = (schema: any): RequestHandler => {
  return async (req, res, next) => {
    if (isEmpty(req.body))
      return res.json({ error: "Empty body is not excepted" });

    const schema_Validate = yup.object({
      body: schema,
    });

    try {
      await schema_Validate.validate(
        {
          body: req.body,
        },
        {
          abortEarly: true,
        }
      );
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.json({ error: error.message });
      }
    }
  };
};
