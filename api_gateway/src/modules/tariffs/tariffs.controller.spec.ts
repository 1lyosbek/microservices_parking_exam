import { Test, TestingModule } from '@nestjs/testing';
import { TariffsController } from './tariffs.controller';
import { TariffsService } from './tariffs.service';

describe('TariffsController', () => {
  let controller: TariffsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TariffsController],
      providers: [TariffsService],
    }).compile();

    controller = module.get<TariffsController>(TariffsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
