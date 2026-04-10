import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { bookService } from './book.service';
import { CreatebookDto } from './dto/create-book.dto';
import { UpdatebookDto } from './dto/update-book.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('book')
export class bookController {
  constructor(private readonly bookService: bookService) {}

  @Get()
findAll(@Query('title') title?: string) {
  return this.bookService.findAll(title);
}


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(Number(id));
  }

  // 🔐 ADMIN & PETUGAS SAJA
@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.PETUGAS) 
create(@Body() dto: CreatebookDto) {
  return this.bookService.create(dto);
}


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatebookDto) {
    return this.bookService.update(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(Number(id));
  }
}
