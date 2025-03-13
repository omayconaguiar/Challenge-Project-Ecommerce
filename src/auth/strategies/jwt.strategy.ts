// jwt.strategy.ts

import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

// If you want type-safety for the JWT payload, define an interface
interface JwtPayload {
  sub: string; // user.id
  role: string; // user.role
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Where to extract the JWT from the request
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Provide the same secret you used to sign your access tokens
      secretOrKey: process.env.JWT_SECRET || 'ACCESS_TOKEN_SECRET',

      // If you want to allow expired tokens in some contexts, set ignoreExpiration: true
      // but usually we keep it false
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    // This method runs after the token is decoded successfully.
    // Return the user info which is then attached to req.user
    return {userId: payload.sub, role: payload.role};
  }
}
