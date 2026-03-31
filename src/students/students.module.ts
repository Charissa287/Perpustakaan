import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [AuthModule], // ← import module yang punya JwtStrategy
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
