import { ValidationError } from "../validationError";

export interface LoginErrors {
  address: ValidationError;
  password: ValidationError;
}
