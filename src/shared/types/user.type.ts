import { UserType } from './user-type.enum.js';

export type User = {
  name: string; // length from 1 to 15
  email: string; // unique for all users
  avatar?: string; // .jpg or .png format
  password: string; // length from 6 to 12
  type: UserType;
};
