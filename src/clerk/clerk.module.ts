import { forwardRef, Module } from '@nestjs/common';
import { ClerkService } from './clerk.service';
import { AppModule } from 'src/app.module';

@Module({
  providers: [ClerkService],
  imports: [forwardRef(() => AppModule)],
})
export class ClerkModule {}
