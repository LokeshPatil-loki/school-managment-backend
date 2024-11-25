import { Controller, Get, Query } from '@nestjs/common';
import { ClassesService } from './providers/classes.service';
import { GetClassesDto } from './dto/get-classes.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  findClasses(@Query() getClassesDto: GetClassesDto) {
    return this.classesService.findClasses(getClassesDto);
  }
}
