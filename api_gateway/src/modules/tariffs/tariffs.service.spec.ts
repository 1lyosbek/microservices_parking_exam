import { Test, TestingModule } from '@nestjs/testing';
import { TariffsService } from './tariffs.service';

describe('TariffsService', () => {
  let service: TariffsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TariffsService],
    }).compile();

    service = module.get<TariffsService>(TariffsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
