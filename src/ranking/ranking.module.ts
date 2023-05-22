import { Module } from '@nestjs/common';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RankingRepository } from './ranking.repository';

@Module({
  controllers: [RankingController],
  providers: [RankingService, RankingRepository],
  imports: [PrismaModule]
})
export class RankingModule {}
