import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PengembalianService {
  constructor(private prisma: PrismaService) {}

  // KEMBALIKAN BUKU
  async create(id_peminjaman: number) {
    // 1. cek peminjaman
    const peminjaman = await this.prisma.peminjamanBuku.findUnique({
      where: { id_peminjaman },
      include: { pengembalian: true },
    });

    if (!peminjaman) {
      throw new NotFoundException('Data peminjaman tidak ditemukan');
    }

    // cegah pengembalian dobel
    if (peminjaman.pengembalian) {
      throw new BadRequestException('Buku sudah dikembalikan');
    }

    // 3. hitung denda
    let denda = 0;
    if (peminjaman.Tanggal_Kembali) {
      const sekarang = new Date();
      if (sekarang > peminjaman.Tanggal_Kembali) {
        const selisihHari = Math.ceil(
          (sekarang.getTime() - peminjaman.Tanggal_Kembali.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        denda = selisihHari * 1000; // 1 hari = 1000
      }
    }

    // 4. simpan pengembalian
    const pengembalian = await this.prisma.pengembalian.create({
  data: {
    id_peminjaman,
    denda,
  },
});

// update status peminjaman
await this.prisma.peminjamanBuku.update({
  where: { id_peminjaman },
  data: {
    status: 'DIKEMBALIKAN',
  },
});

// tambah stok buku
await this.prisma.book.update({
  where: { id: peminjaman.id_buku },
  data: {
    stok: {
      increment: 1,
    },
  },
});

return pengembalian;
}

  //  LIHAT SEMUA PENGEMBALIAN
  async findAll() {
    return this.prisma.pengembalian.findMany({
      include: {
        peminjamanBuku: {
          include: {
            student: true,
            book: true,
          },
        },
      },
    });
  }
}
