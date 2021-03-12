import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  HttpStatus,
  Res,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';
import { Response } from 'express';
import { ImageService } from './image.service';

@Controller()
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/img')
  @UseInterceptors(FileInterceptor('img', { dest: './upload/img' }))
  async uploadImg(@UploadedFile() file: any, @Res() res: any) {
    if (file) {
      const img = await this.imageService.save(file);
      this.imageService.rm(file['filename']);
      return res
        .status(HttpStatus.OK)
        .json({ status: HttpStatus.OK, _id: img._id });
    } else
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: HttpStatus.BAD_REQUEST });
  }

  @Get('img')
  async getImg(@Query('_id') _id: string, @Res() res: Response) {
    const loadedImg = await this.imageService.load(new Types.ObjectId(_id));
    const img = Buffer.from(loadedImg.img.buffer);
    res.writeHead(200, {
      'Content-Type': loadedImg.contentType,
      'Content-Length': img.length,
    });
    res.end(img);
  }
}
