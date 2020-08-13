import { ConfigModule, ConfigService } from '@nestjs/config';

export const mongooseModuleConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      uri: config.get('MONGO_URI')
    }
  },
}
