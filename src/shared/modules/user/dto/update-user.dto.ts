import { UserType } from '../../../types/index.js';

export class UpdateUserDto {
  public name?: string;
  public email?: string;
  public avatarPath?: string;
  public password?: string;
  public type?: UserType;
}
