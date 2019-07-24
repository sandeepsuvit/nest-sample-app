import { ApiUseTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiForbiddenResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { HttpErrorFilter } from './../shared/filters/http-error.filter';
import { Body, Controller, Get, Post, UseGuards, UseFilters } from '@nestjs/common';
import { AuthGuard } from '../shared/guards/auth.gaurd';
import { OtpGuard } from '../shared/guards/otp.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get()
    @ApiOperation({ title: 'Get the list of all users, paginated' })
    @ApiOkResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @UseFilters(new HttpErrorFilter())
    @UseGuards(AuthGuard, OtpGuard)
    getAll() {
        return this.userService.findAll();
    }

    @Post()
    @ApiOperation({ title: 'Register user' })
    @ApiCreatedResponse({ description: 'record created' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    saveUser(@Body() user: CreateUserDto) {
        return this.userService.save(user);
    }
}
