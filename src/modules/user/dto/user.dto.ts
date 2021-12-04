import { IsNotEmpty } from 'class-validator';
import { UserDetails } from '../entities/user.details.entity';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  details: UserDetails;
}
