import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

const verifyBodyRequestMiddleware =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, nextFunction: NextFunction) => {
    const validateBodyData = schema.parse(request.body);
    request.body = validateBodyData;
    return nextFunction();
  };

export default verifyBodyRequestMiddleware;
