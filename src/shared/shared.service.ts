import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
    constructor() {}

    /**
     * Dummy otp validation check
     *
     * @param {number} reqOtp
     * @returns
     * @memberof SharedService
     */
    async validateOtp(reqOtp: number) {
        return await reqOtp === 12345 ? true : false;
    }
}
