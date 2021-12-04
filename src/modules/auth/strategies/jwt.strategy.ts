import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '../../../config/config.service';
import { Configuration } from '../../../config/config.keys';
import { AuthRepository } from '../auth.repository';
import { IJwtPayload } from '../jwt-payload.interface';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    _configService: ConfigService,
    _authRepository: AuthRepository,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { username } = payload;
    const user = await this.userModel
      .findOne({
        username,
        status: 'ACTIVE',
      })
      .exec();

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
