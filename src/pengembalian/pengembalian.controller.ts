import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { PengembalianService } from './pengembalian.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('pengembalian')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PengembalianController {
  constructor(private readonly service: PengembalianService) {}

  // 🔐 ADMIN & PETUGAS
  @Post(':id_peminjaman')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  create(@Param('id_peminjaman') id: string) {
    return this.service.create(Number(id));
  }

  // 🔐 ADMIN & PETUGAS
  @Get()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  findAll() {
    return this.service.findAll();
  }
}
