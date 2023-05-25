import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RankingModule } from './ranking/ranking.module';
import { UrlsModule } from './urls/urls.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, RankingModule, UrlsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}