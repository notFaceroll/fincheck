import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;

    if (!userId) throw new UnauthorizedException();

    // The value returned from here is
    // injected into the controller method
    return userId;
  },
);
