import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((key, req) =>
  key ? req.user[key] : req.user,
);
