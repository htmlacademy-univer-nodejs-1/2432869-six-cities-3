import { pino, Logger as PinoInstance, transport } from 'pino';
import { Logger } from './logger.interface.js';
import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';
import { resolve } from 'node:path';
import { injectable } from 'inversify';
import fs from 'node:fs';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();

    const logDirectory = 'logs';
    const folderName = resolve(modulePath, '../../../', 'logs');
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }

    const logFilePath = `${logDirectory}/rest.log`;
    const destinationPath = resolve(modulePath, '../../../', logFilePath);

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

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
