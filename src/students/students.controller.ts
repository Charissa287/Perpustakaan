import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('admin')
  createAdmin(@Body() dto: CreateStudentDto) {
    return this.studentsService.createAdmin(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('petugas')
  createPetugas(@Body() dto: CreateStudentDto) {
    return this.studentsService.createPetugas(dto);
  }

  // =====================
  // GET / FILTER
  // =====================
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll(
    @Query('id') id?: string,
    @Query('nis') nis?: string,
    @Query('name') name?: string,
  ) {
    if (id) {
      return this.studentsService.findOne(Number(id));
    }
    if (nis) {
      return this.studentsService.findByNis(nis);
    }
    if (name) {
      return this.studentsService.findByName(name);
    }
    return this.studentsService.findAll();
  }

@ApiBody({
  schema: {
    properties: {
      password: { type: 'string', example: 'passwordbaru123' }
    }
  }
})
  @Put(':id/reset-password')
resetPassword(
  @Param('id') id: string,
  @Body('password') password: string,
) {
  return this.studentsService.resetPassword(+id, password);
}


}
