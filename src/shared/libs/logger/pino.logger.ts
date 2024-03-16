import { pino, Logger as PinoInstance, transport } from 'pino';
import { Logger } from './logger.interface';
import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';
import { resolve } from 'node:path';
import { injectable } from 'inversify';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const loginFilePath = 'logs/rest.log';
    const destinationPath = resolve(modulePath, '../../../', loginFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination: destinationPath },
          level: 'debug',
        },
        {
          target: 'pino/file',
          options: {},
          level: 'info',
        }
      ]
    });

    this.logger = pino({}, multiTransport);
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }
}
