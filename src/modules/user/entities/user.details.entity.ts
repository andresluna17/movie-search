import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

export type UserDetailsDocument = UserDetails & Document;

@Schema({ versionKey: false, collection: 'userdetails' })
export class UserDetails {
  @Prop({ type: SchemaTypes.ObjectId, auto: true, name: '_id' })
  _id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  lastname: string;

  @Prop({ type: Boolean })
  status: string;
}
