import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public comment: string;

  @Expose()
  public date: string;

  @Expose()
  public rating: number;

  @Expose()
  public user: string;
}
