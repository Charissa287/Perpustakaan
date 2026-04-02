import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  // =========================
  // STUDENT (DEFAULT)
  // =========================
  async create(dto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    

    return this.prisma.student.create({
      data: {
        nis: dto.nis,
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        userRole: UserRole.STUDENT,
      },
    });

  }

  // =========================
  // ADMIN
  // =========================
  async createAdmin(dto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.student.create({
      data: {
        nis: dto.nis,
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        userRole: UserRole.ADMIN,
      },
    });
  }

  async createPetugas(dto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.student.create({
      data: {
        nis: dto.nis,
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        userRole: UserRole.PETUGAS,
      },
    });
  }

  // =========================
  // GET DATA
  // =========================
  async findAll() {
    return this.prisma.student.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async update(id: number, dto: UpdateStudentDto) {
    await this.findOne(id);
    return this.prisma.student.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.student.delete({
      where: { id },
    });
  }

  async findByNis(nis: string) {
  const student = await this.prisma.student.findUnique({
    where: { nis },
  });

  if (!student) {
    throw new NotFoundException('Student not found');
  }

  return student;
}

async findByName(name: string) {
  return this.prisma.student.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
}

async resetPassword(id: number, newPassword: string) {
  const hashed = await bcrypt.hash(newPassword, 10);

  return this.prisma.student.update({
    where: { id },
    data: { password: hashed },
  });
}

}
