import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { VideoService } from './video.service';

@Controller()
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload/video')
  @UseInterceptors(FileInterceptor('video', { dest: './upload/video' }))
  async uploadVideo(@UploadedFile() file: any, @Res() res: Response) {
    if (file) {
      await this.videoService.vimeoUpload(file['filename'], res);
    } else
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ status: HttpStatus.BAD_REQUEST });
  }
}
