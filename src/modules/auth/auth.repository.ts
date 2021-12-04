import { User } from '../user/entities/user.entity';
import { SignupDto } from './dto';
import { UserDetails } from '../user/entities/user.details.entity';
import { genSalt, hash } from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectModel(UserDetails.name) private userDetailsModel: Model<UserDetails>,
  ) {}

  async signup(signupDto: SignupDto) {
    const { username, email, password } = signupDto;
    const user = new User();
    user.username = username;
    user.email = email;

    let details = new UserDetails();
    details = await this.userDetailsModel.create(details);
    user.details = details;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await this.userRepository.save(user);
  }
}
