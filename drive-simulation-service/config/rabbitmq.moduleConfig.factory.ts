import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { rabbitmqTransportConfigFactory } from './rabbitmq.transportConfig.factory';

export const rabbitmqModuleConfigFactory = (
  serviceName: string,
  queue: string,
): ClientsProviderAsyncOptions => {
  return {
    name: serviceName,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return rabbitmqTransportConfigFactory([config.get('RABBITMQ_URI')], queue)
    },
  }
}
