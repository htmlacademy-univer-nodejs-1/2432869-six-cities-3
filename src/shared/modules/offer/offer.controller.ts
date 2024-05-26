import { inject, injectable } from 'inversify';
import { Component, HttpMethod } from '../../types/index.js';
import { BaseController, HttpError, RequestParams } from '../../../rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/fill-dto.js';
import { OfferService } from './offer-service.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { StatusCodes } from 'http-status-codes';
import { FullOfferRdo } from './rdo/full-offer.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.get });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremium });
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites });
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Post, handler: this.addFavorite });
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Delete, handler: this.removeFavorite });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(FullOfferRdo, offers));
  }

  public async create({ body }: Request<Record<string, unknown>, RequestParams, CreateOfferDto>, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(FullOfferRdo, result));
  }

  public async get({ params }: Request, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(FullOfferRdo, offer));
  }

  public async update({ body, params }: Request<Record<string, unknown>, RequestParams, UpdateOfferDto>, res: Response): Promise<void> {
    const { offerId } = params;
    const updatedOffer = await this.offerService.updateById(offerId as string, body);
    this.ok(res, fillDTO(FullOfferRdo, updatedOffer));
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    this.noContent(res, offer);
  }

  public async getPremium(req: Request, res: Response): Promise<void> {
    const city = req.query.city;

    if (!city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request',
        'OfferController'
      );
    }

    const offers = await this.offerService.findByPremiumAndCity(city as string);
    this.ok(res, fillDTO(FullOfferRdo, offers));
  }

  public async getFavorites(_req: Request, res: Response): Promise<void> {
    const favorites = await this.offerService.findByFavorite();

    // if () {
    //   throw new HttpError(
    //     StatusCodes.UNAUTHORIZED,
    //     'Unauthorized.',
    //     'OfferController'
    //   );
    // }

    this.ok(res, fillDTO(FullOfferRdo, favorites));
  }

  public async addFavorite(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const offer = await this.offerService.findById(id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController'
      );
    }

    const result = await this.offerService.addFavoriteById(id);
    this.ok(res, fillDTO(FullOfferRdo, result));
  }

  public async removeFavorite(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];
    const offer = await this.offerService.findById(id);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${id} not found.`,
        'OfferController'
      );
    }

    const result = await this.offerService.removeFavoriteById(id);
    this.ok(res, fillDTO(FullOfferRdo, result));
  }
}
