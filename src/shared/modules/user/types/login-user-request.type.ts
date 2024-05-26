import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto.js';
import { RequestBody, RequestParams } from '../../../rest/index.js';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
