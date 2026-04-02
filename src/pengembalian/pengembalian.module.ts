import { Module } from '@nestjs/common';
import { PengembalianService } from './pengembalian.service';
import { PengembalianController } from './pengembalian.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PengembalianController],
  providers: [PengembalianService],
})
export class PengembalianModule {}
