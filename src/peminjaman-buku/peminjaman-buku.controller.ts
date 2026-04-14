import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { PeminjamanBukuService } from './peminjaman-buku.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CreatePeminjamanBukuDto } from './dto/create-peminjaman-buku.dto';

@Controller('peminjaman-buku')
export class PeminjamanBukuController {
  constructor(private readonly service: PeminjamanBukuService) {}

  // 🔐 ADMIN & PETUGAS → lihat semua
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  findAll(
    @Req() req,
    @Query('date') date?: string,
  ) {
    return this.service.findAllFiltered(req.user, date);
  }

  // 🔐 ADMIN, PETUGAS, STUDENT (cek kepemilikan)
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id') id: string,
    @Req() req,
  ) {
    return this.service.findOneWithAccess(+id, req.user);
  }

  // 🔐 ADMIN, PETUGAS, STUDENT (pakai NIS sendiri)
  @Get('by-nis/:nis')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findByNis(
    @Param('nis') nis: string,
    @Req() req,
  ) {
    return this.service.findByNisWithAccess(nis, req.user);
  }

  @Post()
  @ApiBearerAuth()
@UseGuards(JwtAuthGuard)
create(
  @Body() dto: CreatePeminjamanBukuDto,
) {
  return this.service.create(dto);
}
}