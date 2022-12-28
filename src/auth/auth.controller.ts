import { Controller, UseGuards, Post, Body, Request, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import { LocalAuthGuard } from './passport/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private authService: AuthService) { }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        console.log(req.user)
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return this.authService.register(registrationData);
    }

}
