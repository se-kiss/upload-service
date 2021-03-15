import { Injectable, HttpService } from '@nestjs/common';
import * as fs from 'fs';
import FormData = require('../../node_modules/form-data');

@Injectable()
export class PodcastService {
  constructor(private httpService: HttpService) {}

  async upload(fileName: string, podcastName: string) {
    const formData = new FormData();
    formData.append('mp3', fs.createReadStream('./upload/podcast/' + fileName));
    formData.append('name', podcastName);
    return this.httpService.post('https://api.mixcloud.com/upload/', formData, {
      headers: formData.getHeaders(),
      params: {
        access_token: process.env.MIXCLOUD_ACCESS_TOKEN,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  }

  rm(fileName: string): void {
    fs.unlinkSync('./upload/podcast/' + fileName);
  }
}
