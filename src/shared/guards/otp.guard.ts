import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SharedService } from './../shared.service';

@Injectable()
export class OtpGuard implements CanActivate {
    constructor(
        private sharedService: SharedService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.otp) {
            throw new HttpException('No otp were provided', HttpStatus.UNAUTHORIZED);
        }
        // request.headers.otp return a string format of 12345 so we have to convert
        // that to an integer if you are comparing it with another int value. To convert
        // the otp field to an int value use `+` in front of the object (this is a short-hand
        // way of typecasting a string to an int in typescript)
        // return await +request.headers.otp === 12345 ? true : false;
        return await this.sharedService.validateOtp(+request.headers.otp);
    }
}
