import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './providers/classes.service';
import { FindClassesProvider } from './providers/find-classes.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, FindClassesProvider],
  imports: [PaginationModule],
})
export class ClassesModule {}
