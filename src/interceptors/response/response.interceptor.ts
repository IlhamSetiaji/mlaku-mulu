import {
  type CallHandler, type ExecutionContext, Injectable, type NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown) => {
        const response: Record<string, unknown> = {};

        if (typeof data === 'string') {
          response.data = null;
          response.message = data;
        } else if (Array.isArray(data) || (typeof data === 'object' && data !== null)) {
          response.data = data;
          response.message = 'Ok';
        } else {
          response.data = null;
          response.message = 'Ok';
        }

        return response;
      }),
    );
  }
}
