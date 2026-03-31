import { Test, TestingModule } from '@nestjs/testing';
import { bookController } from './book.controller';

describe('BookController', () => {
  let controller: bookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [bookController],
    }).compile();

    controller = module.get<bookController>(bookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
