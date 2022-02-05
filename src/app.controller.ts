import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class AppController {
  constructor() {}

  @Get('/users')
  getUsers() {
    return [{ id: '1' }];
  }
}
