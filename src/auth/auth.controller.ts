import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('auth')
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
    @ApiOperation({ title: 'Authenticate user' })
    login(@Body() user: AuthDto) {
        return this.authService.signIn(user);
    }
}
