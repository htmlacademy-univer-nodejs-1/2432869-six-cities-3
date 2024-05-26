import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { OfferEntity } from '../offer/offer.entity.js';

export interface CommentEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, ref: OfferEntity })
  public offerId: Ref<OfferEntity>;

  @prop({ required: true, minlength: 5, maxlength: 1024, trim: true, type: () => String })
  public comment: string;

  @prop({ required: true, min: 1, max: 5, type: () => Number })
  public rating: number;

  @prop({ required: true, ref: UserEntity })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
