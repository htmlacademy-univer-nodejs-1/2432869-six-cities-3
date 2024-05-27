import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DocumentExists } from '../../../rest/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  find(count?: number): Promise<DocumentType<OfferEntity>[] | null>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  findByPremiumAndCity(city: string): Promise<DocumentType<OfferEntity>[] | null>;
  findByFavorite(): Promise<DocumentType<OfferEntity>[] | null>;
  updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(id: string): Promise<DocumentType<OfferEntity> | null>;
  addFavoriteById(id: string): Promise<DocumentType<OfferEntity> | null>;
  removeFavoriteById(id: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentsCount(id: string): Promise<DocumentType<OfferEntity> | null>;
  calculateTotalRating(id: string, newRating: number, newCommentsCount: number): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
