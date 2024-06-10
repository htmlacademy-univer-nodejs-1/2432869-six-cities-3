import { createOffer, getMongoURI } from '../../shared/helpers/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/modules/user/index.js';
import { Offer } from '../../shared/types/offer.type.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onImportEnd = this.onImportEnd.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(filePath: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filePath.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onImportEnd);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filePath}`);
      console.error(getErrorMessage(error));
    }
  }

  private async onImportedLine(line: string, resolve: () => void) {
    if (line.trim().length === 0) {
      return;
    }

    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onImportEnd(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.host,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      city: offer.city,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isRremium,
      type: offer.type,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
      price: offer.price,
      goods: offer.goods,
      host: user.id,
      location: offer.location,
    });
  }
}
