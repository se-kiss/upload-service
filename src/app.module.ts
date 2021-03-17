import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ImageModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
