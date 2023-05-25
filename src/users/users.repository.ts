import { PrismaService } from "src/prisma/prisma.service";
import { Body, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/create-user.dto";

/* {
    "id": id do usuário,
      "name": nome do usuário,
      "visitCount": soma da quantidade de visitas de todos os links do usuário,
      "shortenedUrls": [
          {
              "id": 1,
              "shortUrl": "...",
              "url": "...",
              "visitCount": soma da quantidade de visitas do link
          },
          {
              "id": 2,
              "shortUrl": "...",
              "url": "...",
              "visitCount": soma da quantidade de visitas do link
          }
      ]
  } */

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) { }

  create(@Body() data: CreateUserDTO) {
    return this.prisma.user.create({ data });
  }

  findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } })
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return user;
  }

  async findUserUrls(id:number){
    const visitsTotal = await this.prisma.url.groupBy({
      by: ['userId'],
      where: {userId: id},
      _sum: {
        visitsCounter: true
      }
    })

    const userAndUrlsInfo = await this.prisma.user.findFirst({
      where: {id},
      select: {
        id: true,
        name: true,
        urls: true
      }
    }) 

    return {visitsCounter: visitsTotal[0]._sum.visitsCounter, ...userAndUrlsInfo}

  }
}