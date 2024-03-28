import { Convenience, HousingType } from '../../../types/index.js';

export class CreateRentalOfferDto {
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
  authorId: string;
  commentsCount: number;
  coordinates: string;
}
