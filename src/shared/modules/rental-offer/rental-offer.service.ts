import { RentalOfferService } from './rental-offer-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { RentalOfferEntity } from './rental-offer.entity.js';
import { CreateRentalOfferDto } from './dto/create-rental-offer.dto.js';
import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { RentalOfferDto } from './dto/rental-offer.dto.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './rental-offer.constant.js';

@injectable()
export class DefaultRentalOfferService implements RentalOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RentalOfferModel) private readonly rentalOfferModel: types.ModelType<RentalOfferEntity>,
  ) { }

  public async create(dto: CreateRentalOfferDto): Promise<DocumentType<RentalOfferEntity>> {
    const result = await this.rentalOfferModel.create(dto);
    this.logger.info(`New rentalOffer created: ${dto.title}`);

    return result.populate(['host']);
  }

  public async find(count?: number): Promise<DocumentType<RentalOfferEntity>[] | null> {
    return this.rentalOfferModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count ?? DEFAULT_OFFER_COUNT)
      .populate(['host'])
      .exec();
  }

  public async findByID(id: string): Promise<DocumentType<RentalOfferEntity> | null> {
    return this.rentalOfferModel
      .findById(id)
      .populate(['host'])
      .exec();
  }

  public async findByPremiumAndCity(city: string): Promise<DocumentType<RentalOfferEntity>[] | null> {
    return this.rentalOfferModel
      .find({ isPremium: true, city })
      .sort({ createdAt: SortType.Down })
      .limit(DEFAULT_PREMIUM_OFFER_COUNT)
      .populate(['host'])
      .exec();
  }

  public async findByFavorite(): Promise<DocumentType<RentalOfferEntity>[] | null> {
    return this.rentalOfferModel
      .find({ isFavorite: true })
      .populate(['host'])
      .exec();
  }

  public async updateById(id: string, dto: RentalOfferDto): Promise<DocumentType<RentalOfferEntity> | null> {
    return this.rentalOfferModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate(['host'])
      .exec();
  }

  public async deleteById(id: string): Promise<DocumentType<RentalOfferEntity> | null> {
    return this.rentalOfferModel
      .findByIdAndDelete(id) /// добавить удаление комментариев
      .exec();
  }

  public async addFavoriteById(id: string): Promise<DocumentType<RentalOfferEntity> | null> {
    return this.rentalOfferModel
      .findByIdAndUpdate(id, { isFavorite: true }, { new: true })
      .populate(['host'])
      .exec();
  }

  public async removeFavoriteById(id: string): Promise<DocumentType<RentalOfferEntity> | null> {
    return this.rentalOfferModel
      .findByIdAndUpdate(id, { isFavorite: false }, { new: true })
      .populate(['host'])
      .exec();
  }

  public async incCommentsCount(id: string): Promise<DocumentType<RentalOfferEntity> | null> {
    return this.rentalOfferModel
      .findByIdAndUpdate(id, {
        '$inc': {
          commentCount: 1,
        }
      })
      .populate(['host'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.rentalOfferModel
      .exists({ _id: documentId })) !== null;
  }

  public async calculateTotalRating(id: string, newRating: number, newCommentsCount: number): Promise<DocumentType<RentalOfferEntity> | null> {
    const offer = await this.rentalOfferModel.findById(id).exec();

    if (!offer) {
      return null;
    }

    const totalRating = (offer.rating * (newCommentsCount - 1) + newRating) / newCommentsCount;
    return this.rentalOfferModel
      .findByIdAndUpdate(id, {
        rating: totalRating
      })
      .populate(['host'])
      .exec();
  }
}
