import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../env-config/env-config.module';
import { ImageServerService } from './image-server.service';

@Module({
  imports: [EnvConfigModule],

  providers: [{ provide: 'ImageService', useClass: ImageServerService }],
  exports: ['ImageService'],
})
export class HandleImagesModule {}
