import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { TeachersModule } from './teachers/teachers.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { StudentsModule } from './students/students.module';
import { ParentsModule } from './parents/parents.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ClassesModule } from './classes/classes.module';
import { LessonsModule } from './lessons/lessons.module';
import { ExamModule } from './exam/exam.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ResultsModule } from './results/results.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        explicitConnect: true,
      },
    }),
    TeachersModule,
    PaginationModule,
    StudentsModule,
    ParentsModule,
    SubjectsModule,
    ClassesModule,
    LessonsModule,
    ExamModule,
    AssignmentsModule,
    ResultsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
