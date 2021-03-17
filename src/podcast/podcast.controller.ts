import {
  Controller,
  Res,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PodcastService } from './podcast.service';

@Controller()
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Post('upload/podcast')
  @UseInterceptors(FileInterceptor('podcast', { dest: './upload/podcast' }))
  async upload(
    @UploadedFile() file: any,
    @Res() res: any,
    @Query('podcastName') podcastName: string,
  ) {
    try {
      const podcast = await this.podcastService.upload(
        file['filename'],
        podcastName,
      );
      const uploadRes = (await podcast.toPromise()).data;
      this.podcastService.rm(file['filename']);
      return res.status(HttpStatus.OK).json(uploadRes);
    } catch (e) {
      this.podcastService.rm(file['filename']);
      return res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }
}
