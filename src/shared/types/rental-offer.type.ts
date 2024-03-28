import { Convenience } from './convenience.enum.js';
import { HousingType } from './housing-type.enum.js';
import { User } from './user.type.js';

export type RentalOffer = {
  title: string; // length from 10 to 100
  description: string; // length from 20 to 1024
  date: Date;
  city: string;
  preview: string;
  photos: string[]; // length = 6
  premium: boolean;
  favorite: boolean;
  rating: number; // 1-5 (float)
  type: HousingType;
  roomsNumber: number; // 1-8
  guestsNumber: number; // 1-10
  cost: number; // 100-100000
  conveniences: Convenience[];
  author: User;
  commentsCount: number;
  coordinates: string;
};
