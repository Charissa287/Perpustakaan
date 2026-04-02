import { Module } from '@nestjs/common';
import { PeminjamanBukuController } from './peminjaman-buku.controller';
import { PeminjamanBukuService } from './peminjaman-buku.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PeminjamanBukuController],
  providers: [PeminjamanBukuService, PrismaService],
})
export class PeminjamanBukuModule {}
