import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Image, ImageSchema } from './image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
