import { OfferService } from './offer-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { inject, injectable } from 'inversify';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create({ ...dto, postDate: new Date(), rating: 1, isFavorite: false });
    this.logger.info(`New rental offer created: ${dto.title}`);

    return result.populate(['host']);
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count ?? DEFAULT_OFFER_COUNT)
      .populate(['host'])
      .exec();
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(id)
      .populate(['host'])
      .exec();
  }

  public async findByPremiumAndCity(city: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find({ isPremium: true, 'city.name': city })
      .sort({ createdAt: SortType.Down })
      .limit(DEFAULT_PREMIUM_OFFER_COUNT)
      .populate(['host'])
      .exec();
  }

  public async findByFavorite(): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find({ isFavorite: true })
      .populate(['host'])
      .exec();
  }

  public async updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate(['host'])
      .exec();
  }

  public async deleteById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(id)
      .exec();
  }

  public async addFavoriteById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, { isFavorite: true }, { new: true })
      .populate(['host'])
      .exec();
  }

  public async removeFavoriteById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, { isFavorite: false }, { new: true })
      .populate(['host'])
      .exec();
  }

  public async incCommentsCount(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, {
        '$inc': {
          commentCount: 1,
        }
      })
      .populate(['host'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({ _id: documentId })) !== null;
  }

  public async calculateTotalRating(id: string, newRating: number, newCommentsCount: number): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findById(id).exec();

    if (!offer) {
      return null;
    }

    const totalRating = (offer.rating * (newCommentsCount - 1) + newRating) / newCommentsCount;
    return this.offerModel
      .findByIdAndUpdate(id, {
        rating: totalRating
      })
      .populate(['host'])
      .exec();
  }
}
