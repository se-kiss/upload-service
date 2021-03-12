import { Document, Types } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class Image extends Document {
  @Prop({ type: Types.Buffer, required: true })
  img: Types.Buffer;

  @Prop({ type: String, required: true })
  contentType: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
