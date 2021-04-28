export interface IValidator<ValidateError> {
  validate: (toValidate: unknown) => Promise<void | ValidateError>
}
