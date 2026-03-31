import { Test, TestingModule } from '@nestjs/testing';
import { bookService } from './book.service';

describe('BookService', () => {
  let service: bookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [bookService],
    }).compile();

    service = module.get<bookService>(bookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
