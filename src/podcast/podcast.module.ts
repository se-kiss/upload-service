import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PodcastService } from './podcast.service';
import { PodcastController } from './podcast.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: [PodcastService],
  controllers: [PodcastController],
})
export class PodcastModule {}
