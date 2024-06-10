import { IsOptional, MinLength, MaxLength, IsDateString, IsObject, IsArray, IsBoolean, Min, Max, IsNumber, IsEnum } from 'class-validator';
import { City, Convenience, Coordinates, HousingType } from '../../../types/index.js';
import { UpdateOfferValidationMessage } from './update-offer.message.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: UpdateOfferValidationMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsObject({ message: UpdateOfferValidationMessage.city.invalid })
  public city?: City;

  @IsOptional()
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.images.invalidFormat })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isFavorite.invalidFormat })
  public isFavorite?: boolean;

  @IsOptional()
  @Min(1, { message: UpdateOfferValidationMessage.rating.minValue })
  @Max(5, { message: UpdateOfferValidationMessage.rating.maxValue })
  @IsNumber({ maxDecimalPlaces: 1 }, { message: UpdateOfferValidationMessage.rating.invalidFormat })
  public rating?: number;

  @IsOptional()
  @IsEnum(HousingType, { message: UpdateOfferValidationMessage.type.invalid })
  public type?: HousingType;

  @IsOptional()
  @Min(1, { message: UpdateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: UpdateOfferValidationMessage.bedrooms.maxValue })
  @IsNumber({}, { message: UpdateOfferValidationMessage.bedrooms.invalidFormat })
  public bedrooms?: number;

  @IsOptional()
  @Min(1, { message: UpdateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: UpdateOfferValidationMessage.maxAdults.maxValue })
  @IsNumber({}, { message: UpdateOfferValidationMessage.maxAdults.invalidFormat })
  public maxAdults?: number;

  @IsOptional()
  @Min(100, { message: UpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message: UpdateOfferValidationMessage.price.maxValue })
  @IsNumber({}, { message: UpdateOfferValidationMessage.price.invalidFormat })
  public price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.goods.invalidFormat })
  @IsEnum(Convenience, { each: true, message: UpdateOfferValidationMessage.goods.invalidItemFormat })
  public goods?: Convenience[];

  @IsOptional()
  @IsNumber({}, { message: UpdateOfferValidationMessage.location.invalidFormat })
  public location?: Coordinates;
}
