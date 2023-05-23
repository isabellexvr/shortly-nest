import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UrlsRepository } from './urls.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [UrlsService, UrlsRepository],
  controllers: [UrlsController],
  imports: [PrismaModule, AuthModule, UsersModule],
  exports: [UrlsService]
})
export class UrlsModule {}
