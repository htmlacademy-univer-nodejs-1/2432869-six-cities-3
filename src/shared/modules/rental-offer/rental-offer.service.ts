import { RentalOfferService } from './rental-offer-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { RentalOfferEntity } from './rental-offer.entity.js';
import { CreateRentalOfferDto } from './dto/create-rental-offer.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultRentalOfferService implements RentalOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RentalOfferModel) private readonly RentalOfferModel: types.ModelType<RentalOfferEntity>,
  ) { }

  public async create(dto: CreateRentalOfferDto): Promise<DocumentType<RentalOfferEntity>> {
    const result = await this.RentalOfferModel.create(dto);
    this.logger.info(`New rentalOffer created: ${dto.title}`);

    return result;
  }

  public async findByID(id: string): Promise<DocumentType<RentalOfferEntity> | null> {
    return this.RentalOfferModel.findById(id).exec();
  }

  public async findByCity(city: string): Promise<DocumentType<RentalOfferEntity>[] | null> {
    return this.RentalOfferModel.find({ city });
  }

  public async findByFavorite(): Promise<DocumentType<RentalOfferEntity>[] | null> {
    return this.RentalOfferModel.findOne({ favorite: true });
  }
}
