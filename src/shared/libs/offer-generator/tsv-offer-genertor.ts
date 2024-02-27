import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: MockServerData,
  ) { }

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.previews);
    const photos = this.mockData.photos.join(';');
    const premium = getRandomItem<boolean>(this.mockData.premium);
    const favorite = getRandomItem<boolean>(this.mockData.favorite);
    const type = getRandomItem<string>(this.mockData.types);
    const conveniences = getRandomItems<string>(this.mockData.conveniences).join(';');
    const author = getRandomItem<string>(this.mockData.authors);
    const coordinates = getRandomItem<string>(this.mockData.coordinates);

    const rating = generateRandomValue(this.mockData.rating);
    const roomsNumber = generateRandomValue(this.mockData.roomsNumber);
    const guestsNumber = generateRandomValue(this.mockData.guestsNumber);
    const cost = generateRandomValue(this.mockData.cost);
    const commentsCount = generateRandomValue(this.mockData.commentsCount);

    const date = dayjs()
      .subtract(generateRandomValue({ min: FIRST_WEEK_DAY, max: LAST_WEEK_DAY }), 'day')
      .toISOString();

    return [
      title, description, date, city, preview, photos, premium, favorite,
      rating, type, roomsNumber, guestsNumber, cost, conveniences, author,
      commentsCount, coordinates,
    ].join('/t');
  }
}
