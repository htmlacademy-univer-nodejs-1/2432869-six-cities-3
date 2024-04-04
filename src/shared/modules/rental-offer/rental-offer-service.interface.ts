import { DocumentType } from '@typegoose/typegoose';
import { RentalOfferEntity } from './rental-offer.entity.js';
import { CreateRentalOfferDto } from './dto/create-rental-offer.dto.js';
import { RentalOfferDto } from './dto/rental-offer.dto.js';

export interface RentalOfferService {
  create(dto: CreateRentalOfferDto): Promise<DocumentType<RentalOfferEntity>>;
  find(count?: number): Promise<DocumentType<RentalOfferEntity>[] | null>;
  findByID(id: string): Promise<DocumentType<RentalOfferEntity> | null>;
  findByPremiumAndCity(city: string): Promise<DocumentType<RentalOfferEntity>[] | null>;
  findByFavorite(): Promise<DocumentType<RentalOfferEntity>[] | null>;
  updateById(id: string, dto: RentalOfferDto): Promise<DocumentType<RentalOfferEntity> | null>;
  deleteById(id: string): Promise<DocumentType<RentalOfferEntity> | null>;
  addFavoriteById(id: string): Promise<DocumentType<RentalOfferEntity> | null>;
  removeFavoriteById(id: string): Promise<DocumentType<RentalOfferEntity> | null>;
  incCommentsCount(id: string): Promise<DocumentType<RentalOfferEntity> | null>;
  calculateTotalRating(id: string, newRating: number, newCommentsCount: number): Promise<DocumentType<RentalOfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
