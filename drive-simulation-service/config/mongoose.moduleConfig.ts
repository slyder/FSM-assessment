import { ConfigModule, ConfigService } from '@nestjs/config';

export const mongooseModuleConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    console.log('MONGO_URI', config.get('MONGO_URI'))
    return {
      uri: config.get('MONGO_URI')
    }
  },
}