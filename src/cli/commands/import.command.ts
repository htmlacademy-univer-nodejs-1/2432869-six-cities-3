import { createOffer, getMongoURI } from '../../shared/helpers/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { DefaultRentalOfferService, RentalOfferModel, RentalOfferService } from '../../shared/modules/rental-offer/index.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/modules/user/index.js';
import { RentalOffer } from '../../shared/types/rental-offer.type.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: RentalOfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onImportEnd = this.onImportEnd.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultRentalOfferService(this.logger, RentalOfferModel);
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
    } catch (err) {

      console.error(`Can't import data from file: ${filePath}`);
      console.error(getErrorMessage(err));
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

  private async saveOffer(offer: RentalOffer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      preview: offer.preview,
      photos: offer.photos,
      premium: offer.premium,
      favorite: offer.favorite,
      rating: offer.rating,
      type: offer.type,
      roomsNumber: offer.roomsNumber,
      guestsNumber: offer.guestsNumber,
      cost: offer.cost,
      conveniences: offer.conveniences,
      authorId: user.id,
      commentsCount: offer.commentsCount,
      coordinates: offer.coordinates,
    });
  }
}
