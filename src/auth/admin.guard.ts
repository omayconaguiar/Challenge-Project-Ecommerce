import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Exemplo simples: Checa se request.user.role === 'ADMIN'
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Ajuste conforme sua lógica real
    return user && user.role === 'ADMIN';
  }
}
