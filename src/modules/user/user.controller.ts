import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUser(@Param('id') id: number, @Req() { user }): Promise<User> {
    console.log(user);
    return this._userService.get(id.toString());
  }

  @UseGuards(AuthGuard())
  @Get()
  async getUsers(): Promise<User[]> {
    return this._userService.getAll();
  }
}
