import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from './../user/user.service';
import { IUser } from './../core/interfaces/user.interface';
import { AuthDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(data: AuthDto): Promise<any> {
        const { email, password } = data;
        // Get the user details, with password
        const user: IUser = await this.userService.findOneByEmail(email, true);

        // Validate the user
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password', HttpStatus.UNAUTHORIZED);
        }

        // Get the payload to tokenize
        const payload: JwtPayload = {
            // User payload info
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email,
            },
        };

        // Response after successfull signin
        return {
            ...payload,
            token: this.jwtService.sign(payload, { expiresIn: 60 * 60 * 24 }),
        };
    }
}
