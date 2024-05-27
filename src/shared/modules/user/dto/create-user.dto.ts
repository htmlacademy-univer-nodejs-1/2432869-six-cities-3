import { IsString, Length, IsEmail, IsEnum } from 'class-validator';
import { UserType } from '../../../types/index.js';
import { CreateUserValidationMessage } from './create-user.message.js';

export class CreateUserDto {
  @IsString({ message: CreateUserValidationMessage.name.invalidFormat })
  @Length(1, 15, { message: CreateUserValidationMessage.name.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserValidationMessage.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserValidationMessage.password.invalidFormat })
  @Length(6, 12, { message: CreateUserValidationMessage.password.lengthField })
  public password: string;

  @IsEnum(UserType, { message: CreateUserValidationMessage.type.invalidFormat })
  public type: UserType;
}
