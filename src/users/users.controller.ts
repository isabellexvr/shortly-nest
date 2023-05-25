import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthorizedUser } from 'src/decorators/authorized-user.decorator.ts';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post("sign-up")
    async createUser(@Body() body: CreateUserDTO) {
        return await this.usersService.createUser(body)
    }

    @UseGuards(AuthGuard)
    @Get("me")
    async findAllUrlsByUserId(@AuthorizedUser() user: User){
        return await this.usersService.findUsersUrls(user.id)
    }
}
