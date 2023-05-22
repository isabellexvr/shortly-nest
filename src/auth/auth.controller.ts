import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dtos/auth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("sign-in")
    async signIn(@Body() body: AuthLoginDTO){
        const {email, password} = body;
        return await this.authService.signIn(email, password);
    }
}
