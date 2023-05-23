import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UrlsRepository {
    constructor(private prisma: PrismaService) { }

    //need => userId, shortened url

    findOriginalUrlByUserId(userId: number, originalUrl: string) {
        return this.prisma.url.findFirst({
            where: { AND: [{ originalUrl }, {userId}] }
        })
    }

    shorten(url: string, userId: number) {
        return this.prisma.url.create({
            
        })
    }
}