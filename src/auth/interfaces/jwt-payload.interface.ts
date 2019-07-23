import { AuthUserPayload } from './auth-user.interface';

/**
 * Payload data that has to be signed by JWT
 *
 * @export
 * @interface JwtPayload
 */
export interface JwtPayload {
    user: AuthUserPayload;
}
