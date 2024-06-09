import { inject, injectable } from 'inversify';
import { Controller } from './controller.inerface.js';
import { Response, Router } from 'express';
import { Logger } from '../../shared/libs/logger/index.js';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { Middleware } from '../middleware/middleware.interface.js';
import { Route } from '../types/route.interface.js';
import { PathTransformer } from '../transform/path-transformer.js';
import { Component } from '../../shared/types/index.js';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  @inject(Component.PathTransformer)
  private pathTranformer: PathTransformer;

  constructor(
    protected readonly logger: Logger
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route): void {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item: Middleware) => asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;

    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTranformer.execute(data as Record<string, unknown>);
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(modifiedData);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }
}
