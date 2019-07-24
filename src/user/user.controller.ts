import { Body, Controller, Get, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiImplicitHeader, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.gaurd';
import { OtpGuard } from '../shared/guards/otp.guard';
import { HttpErrorFilter } from './../shared/filters/http-error.filter';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Get()
    @ApiOperation({ title: 'Get the list of all users' })
    @ApiOkResponse({ description: 'success' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @ApiBearerAuth() // Annotation for securing endpoints in swagger
    @UseFilters(new HttpErrorFilter())
    @ApiImplicitHeader({ name: 'otp', description: 'Opt number' }) // Option to pass header value in swagger
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
