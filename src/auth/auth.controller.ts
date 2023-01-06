import { Controller, UseGuards, Post, Body, Request, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
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
        try {
            await this.authService.login(req.user);
        } catch (error) {
            throw new HttpException({ status: 401, }, HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        try {
            await this.authService.register(registrationData);
        } catch (error) {
            throw new HttpException({
                status: 409,
            }, HttpStatus.CONFLICT, {
                cause: error
            });
        }
    }
}
