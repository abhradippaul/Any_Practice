import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getHello(): string {
    return 'Hello World!';
  }
  findAll() {
    return {
      message: "Find all from user service"
    }
  }
}
