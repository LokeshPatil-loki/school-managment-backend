import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { TeachersModule } from './teachers/teachers.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { StudentsModule } from './students/students.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
