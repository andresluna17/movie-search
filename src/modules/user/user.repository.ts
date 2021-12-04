import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from './entities/user.entity';
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  save(user: User) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findById(id: string) {
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  findBy(params: FilterQuery<User>) {
    return this.userModel.find(params).exec();
  }

  findOneBy(params: FilterQuery<User>) {
    return this.userModel.findOne(params).exec();
  }

  async findByAndPopules(params: FilterQuery<User>, populate: object) {
    const user = await this.userModel
      .find(params)
      .populate(populate)
      .select(['-password'])
      .exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  update(id: string, user: User) {
    this.userModel.updateOne({ id }, user).exec();
  }
}
