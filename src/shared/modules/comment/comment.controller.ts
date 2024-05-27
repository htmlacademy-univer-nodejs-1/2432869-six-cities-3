import { inject, injectable } from 'inversify';
import { Component, HttpMethod } from '../../types/index.js';
import { BaseController, HttpError, RequestBody, RequestParams, ValidateDtoMiddleware } from '../../../rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { StatusCodes } from 'http-status-codes';
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

    // this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)]
    });
  }

  // public async index(_req: Request, res: Response): void {
  //   const comment = await this.commentService.findByOfferId();
  //   const responseData = fillDTO(CommentRDO, comment);
  //   this.ok(res, responseData);
  // }

  public async create({ body }: Request<RequestParams, RequestBody, CreateCommentDto>, res: Response): Promise<void> {
    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.incCommentsCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
