import { InformationController } from '../information.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('InformationController', () => {
  let controller: InformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformationController],
    }).compile();

    controller = module.get<InformationController>(InformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
