import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UrlsService],
  controllers: [UrlsController],
  imports: [PrismaModule],
  exports: [UrlsService]
})
export class UrlsModule {}
