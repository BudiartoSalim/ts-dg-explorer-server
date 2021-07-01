import { ErrorRequestHandler, Response } from 'express';

interface IError {
  status: number;
  message: string;
  unhandledError?: unknown;
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const error = errorDef(err);
  error.unhandledError ? unhandledError(error, res) : res.status(error.status).json({ errorMessage: error.message });
};

function errorDef(err: unknown): IError {
  if (err === 'email-empty') { return { status: 400, message: "Email must not be empty." } };
  if (err === 'email-invalid-format') { return { status: 400, message: "Email given is not in a valid email format." } };
  if (err === 'name-invalid-length') { return { status: 400, message: "Name must be between 1 - 255 characters long." } };
  if (err === 'password-invalid-length') { return { status: 400, message: "Password must be at least 6 characters long." } };
  if (err === 'email-already-exists') { return { status: 400, message: "Email already used." } };

  return { status: 500, message: "Internal Server Error", unhandledError: err };
}

function unhandledError(err: IError, res: Response) {
  //apply logger logic here to log unhandled error
  //this function just passes the detail for simplicity, for now
  //should avoid passing raw error info in response and logs it instead
  res.status(err.status).json({ errorMessage: err.message, detail: err.unhandledError });
}

export default errorHandler;