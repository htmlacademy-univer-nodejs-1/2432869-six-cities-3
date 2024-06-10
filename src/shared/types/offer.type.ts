import { City } from './city.type.js';
import { Convenience } from './convenience.enum.js';
import { Coordinates } from './coordinates.type.js';
import { HousingType } from './housing-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isRremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Convenience[];
  host: User;
  location: Coordinates;
};
