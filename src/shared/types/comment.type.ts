import { User } from './user.type.js';

export type Comment = {
  text: string;
  postDate: string;
  rating: number;
  user: User;
};
