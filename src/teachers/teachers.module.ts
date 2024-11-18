import { Module } from '@nestjs/common';
import { TeachersService } from './providers/teachers.service';
import { TeachersController } from './teachers.controller';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [PaginationModule],
})
export class TeachersModule {}
