import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request & { sub?: string }, res: Response, next: Function) {
    const token = req.headers['authorization'];

    try {
      const cleanToken = token.replace('Bearer', '').trim();
      const decoded: any = jwt.decode(cleanToken);
      req.sub = decoded.sub;
    } catch (error) {
      console.log(error);
    }

    next();
  }
}
