import { Convenience } from './convenience.enum.js';
import { HousingType } from './housing-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: string;
  preview: string;
  photos: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  type: HousingType;
  roomsNumber: number;
  guestsNumber: number;
  cost: number;
  conveniences: Convenience[];
  author: User;
  commentsCount: number;
  coordinates: string;
};
