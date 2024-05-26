import { inject, injectable } from 'inversify';
import { Component, HttpMethod } from '../../types/index.js';
import { BaseController } from '../../../rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { CommentService } from './comment-service.interface.js';
import { fillDTO } from '../../helpers/fill-dto.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');

    // this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  // public async index(_req: Request, res: Response): void {
  //   const comment = await this.commentService.findByOfferId();
  //   const responseData = fillDTO(CommentRDO, comment);
  //   this.ok(res, responseData);
  // }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }
}
