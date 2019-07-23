import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Get()
    getHello(): string {
        return 'Hi from auth';
    }

    @Post()
    login(@Body() user: AuthDto) {
        return this.authService.signIn(user);
    }
}
