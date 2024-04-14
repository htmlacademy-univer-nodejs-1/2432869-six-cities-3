import { Convenience, HousingType } from '../../../types/index.js';

export class RentalOfferDto {
  public title: string;
  public description: string;
  public date: Date;
  public city: string;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: HousingType;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: Convenience[];
  public host: string;
  public commentsCount: number;
  public location: string;
}
