import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UrlsRepository } from './urls.repository';
import { User } from '@prisma/client';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlsService {
    constructor(private urlsRepository: UrlsRepository) { }

    async shorten(userId: number, originalUrl: string) {
        const urlExists = await this.urlsRepository.findOriginalUrlByUserId(userId, originalUrl);

        if (urlExists) throw new ConflictException("Essa mesma URL já foi encurtada.")

        const shortenedUrl = nanoid(8);
        const result = await this.urlsRepository.shorten(shortenedUrl, originalUrl, userId);
        return result.shortenedUrl;
    }

    async redirect(shortenedUrl: string) {
        const url = await this.urlsRepository.findUrlFromShortenedUrl(shortenedUrl);
        if (!url) throw new NotFoundException("A URL correspondente não foi encontrada");

        await this.urlsRepository.addOneMoreView(url.visitsCounter + 1, url.id);

        return url.originalUrl;
    }

    async findByUrlId(urlId: number) {
        const url = await this.urlsRepository.findUrlById(urlId);

        if (!url) throw new NotFoundException("Não foi encontrada nenhuma url correspondente a esse id.");

        return url;
    }
}
