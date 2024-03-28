import { Container } from 'inversify';
import { RentalOfferService } from './rental-offer-service.interface.js';
import { Component } from '../../types/index.js';
import { DefaultRentalOfferService } from './rental-offer.service.js';
import { types } from '@typegoose/typegoose';
import { RentalOfferEntity, RentalOfferModel } from './rental-offer.entity.js';

export function createRentalOfferContainer() {
  const RentalOfferContainer = new Container();
  RentalOfferContainer.bind<RentalOfferService>(Component.RentalOfferService).to(DefaultRentalOfferService).inSingletonScope();
  RentalOfferContainer.bind<types.ModelType<RentalOfferEntity>>(Component.RentalOfferModel).toConstantValue(RentalOfferModel);

  return RentalOfferContainer;
}
