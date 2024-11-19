import { Module } from '@nestjs/common';
import { TeachersService } from './providers/teachers.service';
import { TeachersController } from './teachers.controller';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { FindTeachersProvider } from './providers/find-teachers.provider';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService, FindTeachersProvider],
  imports: [PaginationModule],
})
export class TeachersModule {}
