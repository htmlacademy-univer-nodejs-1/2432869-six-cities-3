import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication, createRestAppContainer } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';
import { createCommentContainer } from './shared/modules/comment/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestAppContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
  );

  const restApp = appContainer.get<RestApplication>(Component.RestApplication);
  restApp.init();
}

bootstrap();
