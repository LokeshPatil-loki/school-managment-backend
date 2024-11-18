import { Module } from '@nestjs/common';
import { TeachersService } from './providers/teachers.service';
import { TeachersController } from './teachers.controller';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
