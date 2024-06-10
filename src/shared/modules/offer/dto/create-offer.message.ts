export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  city: {
    invalidFormat: 'city must be an Object',
  },
  images: {
    invalidFormat: 'Images must be an array',
  },
  isPremium: {
    invalidFormat: 'IsPremium must be a Boolean',
  },
  type: {
    invalid: 'type must be value from HousingType Enum',
  },
  bedrooms: {
    minValue: 'Minimum bedrooms count is 1',
    maxValue: 'Maximum bedrooms count is 8',
    invalidFormat: 'bedrooms must be a Number',
  },
  maxAdults: {
    minValue: 'Minimum maxAdults count is 1',
    maxValue: 'Maximum maxAdults count is 10',
    invalidFormat: 'maxAdults must be a Number',
  },
  price: {
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
    invalidFormat: 'price must be a Number',
  },
  goods: {
    invalidFormat: 'goods must be an array',
    invalidItemFormat: 'goods must be value from Convenience Enum'
  },
  location: {
    invalidFormat: 'location must be a valid Object',
  }
} as const;
