import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

 async login(email: string, password: string) {
  const student = await this.prisma.student.findUnique({
    where: { email },
  });

  if (!student) {
    throw new UnauthorizedException('Email tidak ditemukan');
  }

  const isValid = await bcrypt.compare(password, student.password);
  if (!isValid) {
    throw new UnauthorizedException('Password salah');
  }

  const payload = {
    sub: student.id,
    email: student.email,
    role: student.userRole, // ✅ ADMIN / PETUGAS / STUDENT
  };

  return {
    message: 'Login berhasil',
    access_token: this.jwtService.sign(payload),
  };
}
}