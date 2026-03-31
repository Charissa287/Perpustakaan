import { Module } from '@nestjs/common';
import { bookController } from './book.controller';
import { bookService } from './book.service';

@Module({
  controllers: [bookController],
  providers: [bookService]
})
export class BookModule {}
