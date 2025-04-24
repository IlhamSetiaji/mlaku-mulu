import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { ResponseInterceptor } from '../../interceptors/response';

export function SerializeResponse(type: 'pagination' | 'simple' = 'simple') {
  return applyDecorators(UseInterceptors(ResponseInterceptor),
  );
}
