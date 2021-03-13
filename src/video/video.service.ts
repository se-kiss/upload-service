import { Injectable, OnModuleInit, HttpStatus } from '@nestjs/common';
import { Vimeo } from 'vimeo';
import * as fs from 'fs';
import { Response } from 'express';

@Injectable()
export class VideoService implements OnModuleInit {
  private client: Vimeo;

  async onModuleInit() {
    this.client = new Vimeo(
      process.env.VIMEO_CLIENT_ID,
      process.env.VIMEO_CLIENT_SECRET,
      process.env.VIMEO_ACCESS_TOKEN,
    );
  }

  async vimeoUpload(fileName: string, res: Response) {
    this.client.upload(
      './upload/video/' + fileName,
      {
        name: 'Video',
        description: 'The description goes here.',
      },
      function(uri: string) {
        fs.unlinkSync('./upload/video/' + fileName);
        res.status(HttpStatus.OK).json({ status: HttpStatus.OK, uri });
      },
      function(bytes_uploaded: number, bytes_total: number) {
        const percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
        console.log(bytes_uploaded, bytes_total, percentage + '%');
      },
      function(error: string) {
        fs.unlinkSync('./upload/video/' + fileName);
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ status: HttpStatus.BAD_REQUEST, error });
      },
    );
  }

  rm(fileName: string): void {
    fs.unlinkSync('./upload/video/' + fileName);
  }
}
