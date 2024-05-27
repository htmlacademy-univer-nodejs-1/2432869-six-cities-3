import { Convenience, Conveniences, HousingType, HousingTypes, Offer, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    decsription,
    date,
    city,
    preview,
    photos,
    premium,
    favorite,
    rating,
    type,
    roomsNumber,
    guestsNumber,
    cost,
    conveniences,
    authorName,
    commentsCount,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const author = {
    name: authorName,
    email: 'test@email.ru',
    password: '123456',
    type: UserType.Common,
  };

  return {
    title,
    description: decsription,
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
    author,
    commentsCount: +commentsCount,
    coordinates: coordinates,
  };
}
