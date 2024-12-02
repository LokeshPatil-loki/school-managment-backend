import { forwardRef, Module } from '@nestjs/common';
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
import { AnnouncementsModule } from './announcements/announcements.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClerkModule } from './clerk/clerk.module';
import environmentValidation from './config/environment.validation';
import { appConfig, AppConfigType } from './config/app.config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { ClerkAuthGuard } from './auth/guards/clerk-auth/clerk-auth.guard';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: environmentValidation,
    }),
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
    AnnouncementsModule,
    forwardRef(() => ClerkModule),
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_CONFIG',
      useFactory: (configService: ConfigService) =>
        configService.get<AppConfigType>('appConfig'),
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    ClerkAuthGuard,
  ],
  exports: ['APP_CONFIG'],
})
export class AppModule {}
