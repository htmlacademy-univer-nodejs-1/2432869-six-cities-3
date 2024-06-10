import { inject, injectable } from 'inversify';
import { Component, HttpMethod } from '../../types/index.js';
import { BaseController, PrivateRouteMiddleware, RequestBody, RequestParams, ValidateDtoMiddleware } from '../../../rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    this.addRoute({
      path: '/offers/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateCommentDto)]
    });
  }

  public async create({ body, params, tokenPayload }: Request<RequestParams, RequestBody, CreateCommentDto>, res: Response): Promise<void> {
    const { offerId } = params;
    const comment = await this.commentService.create({
      ...body,
      offerId: offerId as string,
      user: tokenPayload.id
    });

    await this.offerService.incCommentsCount(offerId as string);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
