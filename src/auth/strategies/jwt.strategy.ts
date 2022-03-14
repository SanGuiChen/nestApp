import { AuthService } from './../auth.service';
import { ConfigService } from '@nestjs/config';
import { User } from './../../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET'),
    } as StrategyOptions);
  }

  async validate(user: User) {
    const existUser = await this.authService.getUser(user);
    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }
    return existUser;
  }
}
