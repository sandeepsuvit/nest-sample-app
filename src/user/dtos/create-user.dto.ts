import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
    @ApiModelProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiModelProperty()
    @IsEmail({}, { message: 'Invalid email message' })
    @IsNotEmpty()
    email: string;

    @ApiModelProperty()
    @IsNotEmpty()
    password: string;
}
