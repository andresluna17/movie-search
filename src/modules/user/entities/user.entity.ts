import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { status } from 'src/shared/entity-status.num';
import { UserDetails } from './user.details.entity';

export type UserDocument = User & Document;
@Schema({ versionKey: false, collection: 'users' })
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: string;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'UserDetails' })
  details: UserDetails;

  @Prop({ type: String, required: true, enum: status, default: status.ACTIVE })
  status: string;
}
