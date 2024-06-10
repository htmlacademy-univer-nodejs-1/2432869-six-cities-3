import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { randomInt } from 'node:crypto';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: MockServerData,
  ) { }

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const cityName = getRandomItem<string>(this.mockData.cityNames);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium);
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite);
    const type = getRandomItem<string>(this.mockData.types);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const location = getRandomItem<string>(this.mockData.locations);
    const hostName = getRandomItem<string>(this.mockData.hostNames);
    const hostEmail = getRandomItem<string>(this.mockData.hostEmails);
    const hostAvatarUrl = getRandomItem<string>(this.mockData.hostAvatarUrls);
    const hostUserType = getRandomItem<string>(this.mockData.hostUserTypes);

    const rating = generateRandomValue(this.mockData.rating);
    const bedrooms = generateRandomValue(this.mockData.bedrooms);
    const maxAdults = generateRandomValue(this.mockData.maxAdults);
    const price = generateRandomValue(this.mockData.price);

    const postDate = dayjs()
      .subtract(generateRandomValue({ min: FIRST_WEEK_DAY, max: LAST_WEEK_DAY }), 'day')
      .toISOString();

    const hostUniqueEmail = `a${randomInt(0, 100)}${hostEmail}`;

    return [
      title, description, postDate, cityName, previewImage, images, isPremium, isFavorite, rating, type,
      bedrooms, maxAdults, price, goods, location, hostName, hostUniqueEmail, hostAvatarUrl, hostUserType,
    ].join('\t');
  }
}
