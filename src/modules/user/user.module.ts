import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from '../../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { UserDetails } from './entities/user.details.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: SchemaFactory.createForClass(User),
      },
      {
        name: UserDetails.name,
        schema: SchemaFactory.createForClass(UserDetails),
      },
    ]),
    SharedModule,
    AuthModule,
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: SchemaFactory.createForClass(User),
      },
      {
        name: UserDetails.name,
        schema: SchemaFactory.createForClass(UserDetails),
      },
    ]),
    UserRepository,
  ],
})
export class UserModule {}
