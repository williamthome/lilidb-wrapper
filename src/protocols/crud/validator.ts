export interface IValidator<TValidateError> {
  validate: (toValidate?: unknown) => Promise<void | TValidateError>
}
