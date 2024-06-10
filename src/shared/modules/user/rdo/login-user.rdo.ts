import { Expose } from 'class-transformer';

export class LoginUserRdo {
  @Expose()
  public token: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarUrl: string;

  @Expose()
  public type: string;
}
