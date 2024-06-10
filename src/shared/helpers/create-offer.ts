import { City, CityNames, Convenience, HousingType, Offer, User, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    cityName,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    coordinates,
    hostName,
    hostEmail,
    hostAvatarUrl,
    hostUserType
  ] = offerData.replace('\n', '').split('\t');

  const coordinatesTuple = coordinates.split(';');
  const location = {
    latitude: Number.parseFloat(coordinatesTuple[0]),
    longitude: Number.parseFloat(coordinatesTuple[1])
  };
  const cityEntity: City = {
    name: cityName as CityNames,
    location: location
  };
  const host: User = {
    name: hostName,
    email: hostEmail,
    avatarUrl: hostAvatarUrl,
    type: hostUserType as UserType,
  };

  return {
    title,
    description: description,
    postDate: new Date(postDate),
    city: cityEntity,
    previewImage: previewImage,
    images: images.split(';'),
    isRremium: !!isPremium,
    isFavorite: !!isFavorite,
    rating: Number.parseFloat(rating),
    type: type as HousingType,
    bedrooms: +bedrooms,
    maxAdults: +maxAdults,
    price: +price,
    goods: goods.split(';')
      .map((conv) => conv as Convenience),
    host: host,
    location: location,
  };
}
