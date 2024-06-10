import { LimitedNumber } from './limited-number.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  postDates: string[];
  cityNames: string[];
  previewImages: string[];
  images: string[];
  isPremium: boolean[];
  isFavorite: boolean[];
  rating: LimitedNumber;
  types: string[];
  bedrooms: LimitedNumber;
  maxAdults: LimitedNumber;
  price: LimitedNumber;
  goods: string[];
  hostNames: string[];
  hostEmails: string[];
  hostAvatarUrls: string[];
  hostUserTypes: string[];
  locations: string[];
};
