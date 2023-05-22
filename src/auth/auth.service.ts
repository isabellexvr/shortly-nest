import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    private EXPIRATION_TIME = "3 hours";
    private ISSUER = "Shortly";
    private AUDIENCE = "user";

    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
        private usersRepository: UsersRepository
    ) { }

    createAToken(user: User) {
        const token = this.jwt.signAsync({
            email: user.email
        }, {
            expiresIn: this.EXPIRATION_TIME,
            issuer: this.ISSUER,
            audience: this.AUDIENCE,
            subject: String(user.id)
        });
        return token
    };

    checkToken(token: string) {
        try {
            const data = this.jwt.verifyAsync(token, {
                audience: this.AUDIENCE, issuer: this.AUDIENCE
            });
            return data;
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException(error)
        }
    }

    async signIn(email: string, password: string) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new UnauthorizedException("O e-mail e/ou a senha não são válidos.");

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) throw new UnauthorizedException('O e-mail ou a senha não são válidos.');

        return this.createAToken(user);
    }
}
