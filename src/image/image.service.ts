import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Image } from './image.schema';
import * as fs from 'fs';

@Injectable()
export class ImageService implements OnModuleInit {
  constructor(
    @InjectModel(Image.name)
    private readonly imageModel: Model<Image>,
  ) {}

  async onModuleInit() {
    await this.imageModel.syncIndexes();
  }

  async save(file: any): Promise<Image> {
    const image = {
      img: fs.readFileSync('./upload/img/' + file['filename']),
      contentType: file['mimetype'],
    };
    const createdImage = new this.imageModel(image);
    return await createdImage.save();
  }

  rm(fileName: string): void {
    fs.unlinkSync('./upload/img/' + fileName);
  }

  async load(_id: Types.ObjectId): Promise<Image> {
    const image = await this.imageModel.findById(_id);
    if (!image) throw new NotFoundException();
    return image;
  }
}
