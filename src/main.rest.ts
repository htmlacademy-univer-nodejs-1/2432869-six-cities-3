import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication, createRestAppContainer } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createRentalOfferContainer } from './shared/modules/rental-offer/rental-offer.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestAppContainer(),
    createUserContainer(),
    createRentalOfferContainer(),
  );

  const restApp = appContainer.get<RestApplication>(Component.RestApplication);
  restApp.init();
}

bootstrap();
