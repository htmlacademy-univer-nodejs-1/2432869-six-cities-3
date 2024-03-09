import { RestApplication } from './rest/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';

async function bootstrap() {
  const logger = new PinoLogger();

  const restApp = new RestApplication(logger);
  restApp.init();
}

bootstrap();
