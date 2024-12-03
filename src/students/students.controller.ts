import { Controller, Get, Param, Query } from '@nestjs/common';
import { StudentsService } from './providers/students.service';
import { GetStudentsDto } from './dto/get-students.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  @Get()
  findAll(@Query() query: GetStudentsDto) {
    return this.studentsService.findStudents(query);
  }

  @Auth(AuthType.NONE)
  @Get('count')
  count() {
    return this.studentsService.count();
  }

  @Auth(AuthType.NONE)
  @Get('count-by-sex')
  countBySex() {
    return this.studentsService.countBySex();
  }

  @Auth(AuthType.NONE)
  @Get(':id')
  find(@Param() id: number) {
    return { id };
  }
}
