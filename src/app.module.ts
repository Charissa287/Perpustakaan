import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { BookModule } from './book/book.module';
import { PeminjamanBukuModule } from './peminjaman-buku/peminjaman-buku.module';
import { AuthModule } from './auth/auth.module';
import { PengembalianModule } from './pengembalian/pengembalian.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env',
    }),
    PrismaModule,
    StudentsModule,
    BookModule,
    PeminjamanBukuModule,
    AuthModule,
    PengembalianModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
