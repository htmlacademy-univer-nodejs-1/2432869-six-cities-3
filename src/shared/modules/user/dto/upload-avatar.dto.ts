import { IsString } from 'class-validator';
import { UploadAvatarValidationMessage } from './upload-avatar.message';

export class UploadAvatarDto {
  @IsString({ message: UploadAvatarValidationMessage.avatarPath.invalidFormat })
  public avatarPath?: string;
}
