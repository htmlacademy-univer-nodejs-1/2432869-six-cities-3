import { DocumentType } from '@typegoose/typegoose';
import { RentalOfferEntity } from './rental-offer.entity.js';
import { CreateRentalOfferDto } from './dto/create-rental-offer.dto.js';

export interface RentalOfferService {
  create(dto: CreateRentalOfferDto): Promise<DocumentType<RentalOfferEntity>>;
  findByID(id: string): Promise<DocumentType<RentalOfferEntity> | null>;
  findByCity(city: string): Promise<DocumentType<RentalOfferEntity>[] | null>;
  findByFavorite(): Promise<DocumentType<RentalOfferEntity>[] | null>;
}
