import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import { AppExceptionFilter, ExceptionFilter } from './index.js';

export function createRestAppContainer() {
  const restAppContainer = new Container();

  restAppContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restAppContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restAppContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restAppContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restAppContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();

  return restAppContainer;
}
