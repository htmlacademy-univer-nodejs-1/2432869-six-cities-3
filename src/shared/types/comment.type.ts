import { User } from './user.type.js';

export type Comment = {
  text: string; // length from 5 to 1024
  date: string;
  rating: number; // 1-5
  author: User;
};
