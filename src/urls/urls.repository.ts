import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UrlsRepository {
    constructor(private prisma: PrismaService) { }

    //need => userId, shortened url

    findOriginalUrlByUserId(userId: number, originalUrl: string) {
        return this.prisma.url.findFirst({
            where: { AND: [{ originalUrl }, { userId }] }
        })
    }

    shorten(shortenedUrl: string, originalUrl: string, userId: number) {
        return this.prisma.url.create({
            data: {
                shortenedUrl, originalUrl, userId
            }
        })
    }

    findUrlFromShortenedUrl(shortenedUrl: string) {
        return this.prisma.url.findFirst({
            where: { shortenedUrl }
        })
    }

    addOneMoreView(visitsCount: number, id: number) {
        return this.prisma.url.update({
            data: {
                visitsCounter: visitsCount
            },
            where: { id }
        })
    }
}