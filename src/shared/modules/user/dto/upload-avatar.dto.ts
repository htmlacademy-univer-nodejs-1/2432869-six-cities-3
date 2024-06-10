import { IsString } from 'class-validator';
import { UploadAvatarValidationMessage } from './upload-avatar.message.js';

export class UploadAvatarDto {
  @IsString({ message: UploadAvatarValidationMessage.avatarPath.invalidFormat })
  public avatarUrl: string;
}
