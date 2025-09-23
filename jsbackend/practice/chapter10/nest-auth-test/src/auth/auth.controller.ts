import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() userDto: CreateUserDto) {
        return await this.authService.register(userDto);
    }
    @Post('login')
    async login(@Request() requestAnimationFrame, @Response() res) {
        const userInfo = await this.authService.validateUser(
            requestAnimationFrame.body.email,
            requestAnimationFrame.body.password,
        );

        if (userInfo) {
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
        }
        return res.send({ message: 'login success' });
    }
    @UseGuards(LoginGuard)
    @Post('login2')
    async login2(@Request() request, @Response() res) {
        if (!request.cookies['login'] && !request.user) {
            res.cookie('login', JSON.stringify(request.user), {
                httpOnly:true,
                maxAge: 1000 * 10,
            });
        }
        return res.send({ message: 'login2 success' });
    }

    @UseGuards(LoginGuard)
    @Get('test-guard')
    testGuard() {
        return '로그인된 때만 이 글이 보입니다.';
    }
}
