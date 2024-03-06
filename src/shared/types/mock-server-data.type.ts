import { LimitedNumber } from './limited-number.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  dates: string[];
  cities: string[];
  previews: string[];
  photos: string[];
  premium: boolean[];
  favorite: boolean[];
  rating: LimitedNumber;
  types: string[];
  roomsNumber: LimitedNumber;
  guestsNumber: LimitedNumber;
  cost: LimitedNumber;
  conveniences: string[];
  authors: string[];
  commentsCount: LimitedNumber;
  coordinates: string[];
};
