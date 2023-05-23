import { ConflictException, Injectable } from '@nestjs/common';
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
        return result.shortenedUrl ;
    }
}
