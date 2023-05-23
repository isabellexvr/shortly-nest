import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UrlsRepository {
    constructor(private prisma: PrismaService) { }

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

    findUrlById(id: number) {
        return this.prisma.url.findFirst({
            where: { id },
            select: {
                id: true,
                shortenedUrl: true,
                originalUrl: true
            }
        })
    }

    findUrlByIdAndUserId(userId: number, urlId: number) {
        return this.prisma.url.findFirst({
            where: {
                AND: [
                    { id: urlId },
                    { userId }
                ]
            }
        })
    }

    deleteUrl(id: number) {
        return this.prisma.url.delete({ where: { id } })
    }
}