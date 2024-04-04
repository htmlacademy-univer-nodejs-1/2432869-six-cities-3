import { Convenience, HousingType } from '../../../types/index.js';

export class UpdateRentalOfferDto {
  public title?: string;
  public description?: string;
  public city?: string;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public type?: HousingType;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: Convenience[];
  public location?: string;
}
