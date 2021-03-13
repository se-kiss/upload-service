import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
