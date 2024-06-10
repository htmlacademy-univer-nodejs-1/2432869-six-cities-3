import { MinLength, MaxLength, IsObject, IsArray, IsBoolean, IsEnum, Min, Max, IsNumber } from 'class-validator';
import { City, Convenience, Coordinates, HousingType } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.message.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsObject({ message: CreateOfferValidationMessage.city.invalidFormat })
  public city: City;

  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(HousingType, { message: CreateOfferValidationMessage.type.invalid })
  public type: HousingType;

  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  @IsNumber({}, { message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  public bedrooms: number;

  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  @IsNumber({}, { message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  public maxAdults: number;

  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  @IsNumber({}, { message: CreateOfferValidationMessage.price.invalidFormat })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.goods.invalidFormat })
  @IsEnum(Convenience, { each: true, message: CreateOfferValidationMessage.goods.invalidItemFormat })
  public goods: Convenience[];

  public host: string;

  @IsObject({ message: CreateOfferValidationMessage.location.invalidFormat })
  public location: Coordinates;
}
