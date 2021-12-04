import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';

@Schema({ versionKey: false, collection: 'historysearch' })
export class HistorySearch {
  @Prop({ auto: true, type: SchemaTypes.ObjectId })
  _id: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  ip?: string;

  @Prop()
  title: string;

  @Prop()
  genres?: number[];

  @Prop()
  director?: string;

  @Prop()
  year?: Date;

  @Prop({ default: new Date() })
  createdAt: Date;
}
