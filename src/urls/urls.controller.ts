import { Body, ConflictException, Controller, Get, Param, ParseIntPipe, Res, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsRepository } from './urls.repository';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthorizedUser } from 'src/decorators/authorized-user.decorator.ts';
import { User } from '@prisma/client';
import { ShortenUrlDTO } from './dtos/shorten-url.dto';
import { nanoid } from 'nanoid';
import { NotFoundException } from '@nestjs/common';
import { Response } from 'express';
@Controller('urls')
export class UrlsController {
    constructor(
        private urlsService: UrlsService,
        private urlsRepository: UrlsRepository
    ) { }

    @UseGuards(AuthGuard)
    @Post("shorten")
    async shorten(@AuthorizedUser() user: User, @Body() body: ShortenUrlDTO) {
        const url = await this.urlsService.shorten(user.id, body.originalUrl);
        return {shortUrl: url};

    }

    @Get("open/:shortUrl")
    async redirectToUrl(@Param("shortUrl", ParseIntPipe) shortenedUrl: string, @Res() res: Response) {

        const url = await this.urlsRepository.findUrlFromShortenedUrl(shortenedUrl);

        if (url) throw new NotFoundException("A URL correspondente não foi encontrada");

        await this.urlsRepository.addOneMoreView(url.visitsCounter + 1, url.id)
        res.redirect(`${url.originalUrl}`);
    }



}
