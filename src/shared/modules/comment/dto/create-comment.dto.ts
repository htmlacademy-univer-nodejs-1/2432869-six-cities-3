import { IsString, Length, Min, Max, IsNumber } from 'class-validator';
import { CreateCommentValidationMessage } from './create-comment.message';

export class CreateCommentDto {
  public offerId: string;

  @IsString({ message: CreateCommentValidationMessage.comment.invalidFormat })
  @Length(5, 1024, { message: CreateCommentValidationMessage.comment.lengthField })
  public comment: string;

  @Min(1, { message: CreateCommentValidationMessage.rating.minValue })
  @Max(5, { message: CreateCommentValidationMessage.rating.maxValue })
  @IsNumber({}, { message: CreateCommentValidationMessage.rating.invalidFormat })
  public rating: number;

  public userId: string;
}
