import { Module } from '@nestjs/common';
import { ParentService } from './providers/parents.service';
import { ParentController } from './parents.controller';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { FindParentsProvider } from './providers/find-parents.provider';

@Module({
  controllers: [ParentController],
  providers: [ParentService, FindParentsProvider],
  imports: [PaginationModule],
})
export class ParentsModule {}
