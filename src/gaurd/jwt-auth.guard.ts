import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    try {
      const decoded = this.jwtService.verifyToken(token);
      request.userId = decoded._id;
      return true;
    } catch (error) {
      return false;
    }
  }
}
