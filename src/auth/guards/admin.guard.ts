import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1]; // Extract token

    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    try {
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET || 'ACCESS_TOKEN_SECRET',
      );
      const encryptedRole = decoded.role;

      const secretKey = process.env.ROLE_SECRET || 'some-random-secret-key';
      const expectedAdminHash = crypto
        .createHmac('sha256', secretKey)
        .update('ADMIN')
        .digest('hex');

      return encryptedRole === expectedAdminHash;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
