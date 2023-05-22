import { Injectable } from '@nestjs/common';
import { RankingRepository } from './ranking.repository';

@Injectable()
export class RankingService {
    constructor(private rankingRepository: RankingRepository){}

    async findPodium(){
        return this.rankingRepository.findPodium()
    }
}
