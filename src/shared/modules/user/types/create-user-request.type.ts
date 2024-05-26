import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../../rest';
import { CreateUserDto } from '../dto/create-user.dto';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
