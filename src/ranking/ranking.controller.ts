import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { RankingService } from './ranking.service';

type QueryPodium = {
    id: number,
    name: string,
    linksCount: bigint,
    visitCount: bigint
}

@Controller('ranking')
export class RankingController {

    constructor(private rankingService: RankingService) { }

    @Get("/")
    async findPodium() {
        const podium = await this.rankingService.findPodium() as Array<QueryPodium>

        return podium.map(p => {
            return {
                id: p.id,
                name: p.name,
                linksCount: Number(p.linksCount),
                visitsCount: Number(p.visitCount)
            }
        })
    }
}
