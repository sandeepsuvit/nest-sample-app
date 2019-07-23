import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/guards/auth.gaurd';
import { OtpGuard } from '../shared/guards/otp.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get()
    @UseGuards(AuthGuard, OtpGuard)
    getAll() {
        return this.userService.findAll();
    }

    @Post()
    saveUser(@Body() user: CreateUserDto) {
        return this.userService.save(user);
    }
}
