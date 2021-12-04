import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, SigninDto } from './dto';
import { User } from '../user/entities/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository)
    private readonly _authRepository: AuthRepository,
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(JwtService)
    private readonly _jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<void> {
    const { username, email } = signupDto;
    const userExists = await this.userModel
      .findOne({
        username,
        email,
      })
      .exec();

    if (userExists) {
      throw new ConflictException('username or email already exists');
    }

    return this._authRepository.signup(signupDto);
  }

  async signin(signinDto: SigninDto): Promise<{ token: string }> {
    const { username, password } = signinDto;

    const user: User = await this.userModel
      .findOne({
        username,
      })
      .exec();

    if (!user) {
      throw new NotFoundException('user does not exist');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload: IJwtPayload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = this._jwtService.sign(payload);

    return { token };
  }
}
