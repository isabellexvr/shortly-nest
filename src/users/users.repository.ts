import { PrismaService } from "src/prisma/prisma.service";
import { Body, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/create-user.dto";

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) { }

  create(@Body() data: CreateUserDTO) {
    return this.prisma.user.create({ data });
  }

  findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } })
  }
}