import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePeminjamanBukuDto } from './dto/create-peminjaman-buku.dto';
import { UserRole } from '@prisma/client'

@Injectable()
export class PeminjamanBukuService {
  constructor(private prisma: PrismaService) {}

  // ================= PINJAM BUKU =================
  async create(dto: CreatePeminjamanBukuDto) {
    const student = await this.prisma.student.findUnique({
      where: { nis: dto.nis },
    });

    if (!student) {
      throw new NotFoundException('Student tidak ditemukan');
    }

    const book = await this.prisma.book.findUnique({
    where: { id: dto.id_buku }
  });

  if (!book) {
    throw new NotFoundException('Buku tidak ditemukan');
  }

  // 🔥 CEK STOK
  if (book.stok < 1) {
    throw new ForbiddenException('Buku sedang dipinjam');
  }

    const tanggalPinjam = new Date();
    const tanggalKembali = new Date();
    tanggalKembali.setDate(tanggalPinjam.getDate() + 7);

    // 🔥 KURANGI STOK
  await this.prisma.book.update({
    where: { id: dto.id_buku },
    data: {
      stok: {
        decrement: 1,
      },
    },
  });

    return this.prisma.peminjamanBuku.create({
      data: {
        id_student: student.id,
        id_buku: dto.id_buku,
        Tanggal_Kembali: tanggalKembali,
        status: 'DIPINJAM'
      },
    });
  }

  // ================= GET ALL (ADMIN & PETUGAS) =================
  async findAllFiltered(user: any, date?: string) {
    if (user.role === UserRole.STUDENT) {
      throw new ForbiddenException('Siswa tidak boleh melihat semua data');
    }

    let dateFilter = {};

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);

      dateFilter = {
        Tanggal_Pinjam: {
          gte: start,
          lt: end,
        },
      };
    }

    return this.prisma.peminjamanBuku.findMany({
      where: dateFilter,
      include: {
        student: true,
        book: true,
      },
    });
  }

  // ================= GET BY ID =================
  async findOneWithAccess(id: number, user: any) {
    const data = await this.prisma.peminjamanBuku.findUnique({
      where: { id_peminjaman: id },
      include: { student: true, book: true },
    });

    if (!data) throw new NotFoundException('Data tidak ditemukan');

    if (
      user.role === UserRole.STUDENT &&
      data.id_student !== user.sub
    ) {
      throw new ForbiddenException('Bukan data milikmu');
    }

    return data;
  }

  // ================= GET BY NIS =================
  async findByNisWithAccess(nis: string, user: any) {
    if (
      user.role === UserRole.STUDENT &&
      user.nis !== nis
    ) {
      throw new ForbiddenException('Tidak boleh melihat data siswa lain');
    }

    return this.prisma.peminjamanBuku.findMany({
      where: {
        student: { nis },
      },
      include: {
        student: true,
        book: true,
      },
    });
  }
}
