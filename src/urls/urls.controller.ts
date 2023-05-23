import { Body, ConflictException, Controller, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsRepository } from './urls.repository';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthorizedUser } from 'src/decorators/authorized-user.decorator.ts';
import { User } from '@prisma/client';
import { ShortenUrlDTO } from './dtos/shorten-url.dto';
import { nanoid } from 'nanoid';

@Controller('urls')
export class UrlsController {
    constructor(
        private urlsService: UrlsService,
        private urlsRepository: UrlsRepository
    ) { }

    @UseGuards(AuthGuard)
    @Post()
    async shorten(@AuthorizedUser() user: User, @Body() body: ShortenUrlDTO) {
        const urlExists = await this.urlsRepository.findOriginalUrlByUserId(user.id, body.url);

        if (urlExists) throw new ConflictException("Essa mesma URL já foi encurtada.")

        const {url} = body;
        const shortenedUrl = nanoid(8);

    }
}
