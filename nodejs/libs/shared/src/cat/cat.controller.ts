import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('cats')
export class CatController {

  constructor(
    @Inject('CAT_BUS') private catBus: ClientProxy,
  ) {
  }


  @Get()
  index(): string {
    return 'ok';
  }

  @Get('generateEvent')
  getCar(): string {
    this.catBus.emit<number>('cat-bus-event', 'message data');
    // this.catBus.send()

    console.log('123');
    return 'ok';
  }

}
