import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { status } from '../../shared/entity-status.num';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async get(id: string): Promise<User> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user: User = await this._userRepository.findById(id);

    if (user.status !== status.ACTIVE) {
      throw new NotFoundException();
    }

    return user;
  }

  async getAll(): Promise<User[]> {
    const users: User[] = await this._userRepository.findByAndPopules(
      {
        status: status.ACTIVE,
      },
      {
        path: 'details',
        model: 'UserDetails',
      },
    );

    return users;
  }
}
