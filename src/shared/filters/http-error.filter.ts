import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Filter for handling all HTTP errors
 *
 * @export
 * @class HttpErrorFilter
 * @implements {ExceptionFilter}
 */
@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        // Response header
        const response = ctx.getResponse<Response>();
        // Request header
        const request = ctx.getRequest<Request>();
        // Error code
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        // Custom response
        let errorResponse = {
            error_code: status,
            path: request.url,
            method: request.method,
            timestamp: new Date().toISOString(),
            message: status !== HttpStatus.INTERNAL_SERVER_ERROR
                ? exception.message.error || exception.message || null
                : 'Internal server error',
        };

        // Enable this only for dev mode
        if (process.env.NODE_ENV === 'dev') {
            errorResponse = Object.assign(errorResponse, {
                trace: this._transform(exception.message.message || exception.message || null),
            });
        }

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            // Enable this only for dev mode
            if (process.env.NODE_ENV === 'dev') {
                errorResponse = Object.assign(errorResponse, {
                    trace: exception.message,
                });
            }

            Logger.error(
                `${request.method} ${request.url}`,
                exception.stack,
                'ExceptionFilter',
            );
        } else {
            Logger.error(
                `${request.method} ${request.url}`,
                JSON.stringify(errorResponse),
                'ExceptionFilter',
            );
        }
        // Data to send back
        response.status(status).json(errorResponse);
    }

    /**
     * Convert the error message into readable form
     *
     * @private
     * @param {*} errors
     * @returns
     * @memberof HttpErrorFilter
     */
    private _transform(errors: any) {
        // Check if the error is an object instance or empty
        if (errors instanceof Object && this._isEmpty(errors)) {
            return 'Validation failed: No body or query params submitted';
        }

        // Check if the error is an array type
        if (errors instanceof Array) {
            return `Validation failed: ${this._formatErrors(errors)}`;
        }

        // Return if the error is a string
        return errors;
    }

    /**
     * Concatnate all the errors
     *
     * @private
     * @param {any[]} errors
     * @returns
     * @memberof HttpErrorFilter
     */
    private _formatErrors(errors: any[]) {
        return errors
            .map(err => {
                for (const property of Object.keys(err.constraints)) {
                    return err.constraints[property];
                }
            })
            .join(', ');
    }

    /**
     * Check if the data is empty
     *
     * @private
     * @param {*} value
     * @returns
     * @memberof HttpErrorFilter
     */
    private _isEmpty(value: any) {
        return Object.keys(value).length > 0 ? false : true;
    }
}
