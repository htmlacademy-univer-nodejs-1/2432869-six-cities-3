export const CreateUserValidationMessage = {
  name: {
    invalidFormat: 'name must be a valid String',
    lengthField: 'Min length is 1, max is 15',
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  password: {
    invalidFormat: 'password must be a valid String',
    lengthField: 'Min length for password is 6, max is 12'
  },
  type: {
    invalidFormat: 'type must be value from UserType Enum'
  }
} as const;
