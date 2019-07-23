import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * Authentication request object
 *
 * @export
 * @class AuthDto
 */
export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
