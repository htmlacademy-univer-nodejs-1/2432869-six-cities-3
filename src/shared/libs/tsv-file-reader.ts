import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Convenience, Conveniences, HousingType, HousingTypes, RentalOffer, UserType } from '../types/index.js';
import { formatCoordinates } from './format-coordinates.js';

export class TSVFileReader implements FileReader {
  private rowData = '';

  constructor(
    private readonly filePath: string
  ) { }

  public read(): void {
    this.rowData = readFileSync(this.filePath, 'utf-8');
  }

  public toArray(): RentalOffer[] {
    if (!this.rowData) {
      throw new Error('File was not read');
    }

    return this.rowData
      .split('/n')
      .filter((line) => line.trim().length > 0)
      .map((line) => line.split('/t'))
      .map(([title, decsription, date, city, preview, photos, premium, favorite, rating, type, roomsNumber, guestsNumber, cost, conveniences, authorName, commentsCount, coordinates]) => ({
        title,
        decsription,
        date: new Date(date),
        city,
        preview,
        photos: photos.split(';'),
        premium: !!premium,
        favorite: !!favorite,
        rating: Number.parseFloat(rating),
        type: HousingType[type as HousingTypes],
        roomsNumber: +roomsNumber,
        guestsNumber: +guestsNumber,
        cost: +cost,
        conveniences: conveniences.split(';')
          .map((conv) => Convenience[conv as Conveniences]),
        author: {
          name: authorName,
          email: 'test@email.ru',
          password: '123456',
          type: UserType.Common,
        },
        commentsCount: +commentsCount,
        coordinates: formatCoordinates(coordinates),
      }));
  }
}
