import { ValidationError } from "../validationError";

export interface RegistrationErrors {
  address: ValidationError;
  nickname: ValidationError;
  password: ValidationError;
  avatar: ValidationError;
}
