import { UserType } from './user-type.enum.js';

export type User = {
  name: string; // length from 1 to 15
  email: string; // unique for all users
  avatarPath?: string; // .jpg or .png format
  type: UserType;
};
