/* eslint-disable import/order */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';;
import { ExtractJwt, Strategy, type StrategyOptionsWithRequest } from 'passport-jwt';
import type { Request } from 'express';

import { AuthService } from '../auth.service';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // algorithms: ['RS256'],
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  async validate(req: Request, payload: JwtPayload): Promise<any> {
    console.log('JWT payload:', payload);
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const user = await this.authService.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    req.user = user;

    console.log("attaching user to request:", req.user);  
    
    return user;
  }
  
}
