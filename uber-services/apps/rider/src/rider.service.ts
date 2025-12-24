import { Injectable } from '@nestjs/common';

@Injectable()
export class RiderService {
  getHello() {
    return {
      message: 'Hello World!',
    };
  }
}
