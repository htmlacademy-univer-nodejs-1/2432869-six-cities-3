export const CreateCommentValidationMessage = {
  offerId: {
    invalidFormat: 'offerId must be a valid id String'
  },
  comment: {
    invalidFormat: 'comment must be a valid String',
    lengthField: 'Min length is 5, max is 2024'
  },
  rating: {
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
    invalidFormat: 'rating must be a Number',
  },
} as const;
