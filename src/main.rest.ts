import { RestApplication } from './rest/index.js';
import { RestConfig } from './shared/libs/config/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';

async function bootstrap() {
  const logger = new PinoLogger();
  const config = new RestConfig(logger);

  const restApp = new RestApplication(logger, config);
  restApp.init();
}

bootstrap();