import { Expose } from 'class-transformer';
import { HousingType } from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public date: Date;

  @Expose()
  public city: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: HousingType;

  @Expose()
  public price: number;

  @Expose()
  public commentsCount: number;

}
