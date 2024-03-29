import { ErrorRequestHandler, Response } from 'express';
import { writeFileSync } from 'fs';
import fs from 'fs';

interface IError {
  status: number;
  message: string;
  unhandledError?: unknown;
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const error = errorDef(err);
  error.unhandledError ? unhandledError(error, res) : res.status(error.status).json({ errorMessage: error.message });
};

function errorDef(err: string | unknown): IError {
  const errors: { [k: string]: IError } = {
    'email-empty': { status: 400, message: "Email must not be empty." },
    'email-invalid-format': { status: 400, message: "Email given is not in a valid email format." },
    'name-invalid-length': { status: 400, message: "Name must be between 1 - 255 characters long." },
    'password-invalid-length': { status: 400, message: "Password must be at least 6 characters long." },
    'email-already-exists': { status: 400, message: "Email already used." },
    'wrong-password': { status: 400, message: "Email/Password is incorrect." },
    'unauthorized': { status: 401, message: "Unauthorized." },
    'player-parse-error': { status: 401, message: "Authorization Error." },
    'invalid-unit-token': { status: 400, message: "Selected unit cannot be hired anymore." }
  }

  if (typeof err === 'string' && errors[err]) { return errors[err]; };

  return { status: 500, message: "Internal Server Error", unhandledError: err };
}

function unhandledError(err: IError, res: Response) {
  //apply logger logic here to log unhandled error
  //this function just passes the detail for simplicity, for now
  //should avoid passing raw error info in response and logs it instead
  fs.writeFileSync(`./error_logs/logs_${Date.now()}.json`, JSON.stringify(err, null, 2));
  res.status(err.status).json({ errorMessage: err.message, detail: err.unhandledError });
}

export default errorHandler;