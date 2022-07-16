import { InformationService } from '../information.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('InformationService', () => {
  let service: InformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformationService],
    }).compile();

    service = module.get<InformationService>(InformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
