import { Expose, Type } from 'class-transformer';
import { City, Coordinates } from '../../../types';
import { UserRdo } from '../../user';

export class FullOfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: string;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: string[];

  @Expose()
  @Type(() => UserRdo)
  public host: UserRdo;

  @Expose()
  public commentCount: number;

  @Expose()
  public location: Coordinates;
}
