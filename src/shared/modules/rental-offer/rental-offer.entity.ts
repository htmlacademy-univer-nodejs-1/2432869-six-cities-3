import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Convenience } from '../../types/convenience.enum.js';
import { HousingType } from '../../types/housing-type.enum.js';
import { UserEntity } from '../user/index.js';

export interface RentalOfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'rental-offers'
  }
})
export class RentalOfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true, minlength: 10, maxlength: 100, default: '', type: () => String })
  public title: string;

  @prop({ required: true, trim: true, minlength: 20, maxlength: 1024, default: '', type: () => String })
  public description: string;

  @prop({ required: true, type: () => Date })
  public date: Date;

  @prop({ required: true, type: () => String })
  public city: string;

  @prop({ required: true, type: () => String })
  public preview: string;

  @prop({ required: true, type: () => Array<string> }) // сделать равным по длине 6
  public photos: string[];

  @prop({ required: true, default: false, type: () => Boolean })
  public premium: boolean;

  @prop({ required: true, default: false, type: () => Boolean })
  public favorite: boolean;

  @prop({ required: true, min: 1, max: 5, type: () => Number })
  public rating: number;

  @prop({ required: true, enum: HousingType, type: () => String })
  public type: HousingType;

  @prop({ required: true, min: 1, max: 8, type: () => Number })
  public roomsNumber: number;

  @prop({ required: true, min: 1, max: 10, type: () => Number })
  public guestsNumber: number;

  @prop({ required: true, min: 100, max: 100000, type: () => Number })
  public cost: number;

  @prop({ required: true, type: () => Array<string> })
  public conveniences: Convenience[];

  @prop({ required: true, ref: UserEntity })
  public authorId: Ref<UserEntity>;

  @prop({ required: true, default: 0, type: () => Number })
  public commentsCount: number;

  @prop({ required: true, type: () => String })
  public coordinates: string;
}

export const RentalOfferModel = getModelForClass(RentalOfferEntity);
