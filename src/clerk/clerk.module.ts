import { forwardRef, Global, Module } from '@nestjs/common';
import { ClerkService } from './clerk.service';
import { AppModule } from 'src/app.module';

@Global()
@Module({
  providers: [ClerkService],
  imports: [forwardRef(() => AppModule)],
  exports: [ClerkService],
})
export class ClerkModule {}
