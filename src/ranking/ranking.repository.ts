import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RankingRepository {
    constructor(private prisma: PrismaService) { }

    async findPodium() {
        return this.prisma.$queryRaw`    
                SELECT 
                    users.id, 
                    users.name, 
                    COUNT(urls."userId") AS "linksCount", 
                    SUM(urls."visitsCounter") AS "visitCount"
                FROM users
                JOIN urls ON urls."userId"=users.id
                GROUP BY users.id
                ORDER BY "visitCount" DESC
                LIMIT 10
                `
    }
}