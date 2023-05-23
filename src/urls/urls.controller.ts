import { Body, Controller, Delete, Get, Param, ParseIntPipe, Res, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthorizedUser } from 'src/decorators/authorized-user.decorator.ts';
import { User } from '@prisma/client';
import { ShortenUrlDTO } from './dtos/shorten-url.dto';
import { Response } from 'express';
@Controller('urls')
export class UrlsController {
    constructor(
        private urlsService: UrlsService
    ) { }

    @UseGuards(AuthGuard)
    @Post("shorten")
    async shorten(@AuthorizedUser() user: User, @Body() body: ShortenUrlDTO) {
        const url = await this.urlsService.shorten(user.id, body.originalUrl);
        return { shortUrl: url };

    }

    @Get("open/:shortUrl")
    async redirectToUrl(@Param("shortUrl") shortenedUrl: string, @Res() res: Response) {
        const originalUrl = await this.urlsService.redirect(shortenedUrl);

        res.redirect(`${originalUrl}`);
    }

    @Get(":id")
    async findByUrlId(@Param("id", ParseIntPipe) id: number) {
        return await this.urlsService.findByUrlId(id);

    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async deleteUrl(@AuthorizedUser() user: User, @Param("id", ParseIntPipe) urlId: number) {
        await this.urlsService.deleteUrl(user.id, urlId);
        return
    }

}
