import { JwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/**
 * Authentication guard
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {

    /**
     * Check if the user can activate the route
     *
     * @param {ExecutionContext} context
     * @returns {Promise<boolean>}
     * @memberof AuthGuard
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            throw new HttpException('No tokens were provided', HttpStatus.UNAUTHORIZED);
        }
        // Attach the auth information in the request
        request.authInfo = await this._validateToken(request.headers.authorization);
        return true;
    }

    /**
     * Method to validate a token
     *
     * @param {string} auth
     * @returns
     * @memberof AuthGuard
     */
    private async _validateToken(auth: string): Promise<JwtPayload> {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        // Extract the token from the authorization header
        const token = auth.split(' ')[1];

        try {
            return await jwt.verify(token, `myScretKey`) as any;
        } catch (err) {
            throw new HttpException(`Token error: ${err.message || err.name}`, HttpStatus.UNAUTHORIZED);
        }
    }
}
