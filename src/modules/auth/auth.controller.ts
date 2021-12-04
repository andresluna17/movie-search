import { Controller, Post, Body } from '@nestjs/common';
import { SignupDto, SigninDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto): Promise<void> {
    return this._authService.signup(signupDto);
  }

  @Post('/signin')
  async signin(@Body() signinDto: SigninDto) {
    return this._authService.signin(signinDto);
  }
}
