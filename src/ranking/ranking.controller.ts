import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {

    constructor(private rankingService: RankingService) { }

    @Get("/")
    async findPodium() {
        const podium  = await this.rankingService.findPodium();
        return podium
    }

}
