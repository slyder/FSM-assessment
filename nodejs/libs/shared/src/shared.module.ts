import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { CatModule } from './cat/cat.module';

@Module({
  providers: [SharedService],
  exports: [SharedService],
  imports: [CatModule],
})
export class SharedModule {}
