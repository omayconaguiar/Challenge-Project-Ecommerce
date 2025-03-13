import {Test, TestingModule} from '@nestjs/testing';
import {EmployerService} from '../../src/employer/employer.service';
import {PrismaService} from '../../src/prisma/prisma.service';

describe('EmployerService (Unit)', () => {
  let service: EmployerService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployerService,
        {
          provide: PrismaService,
          useValue: {
            employer: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<EmployerService>(EmployerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create an employer', async () => {
    const dto = {
      email: 'user@company.com',
      role: 'ADMIN',
      companyId: 'uuid-123',
    };
    prisma.employer.create.mockResolvedValue({id: 1, ...dto});

    const result = await service.create(dto as any);
    expect(prisma.employer.create).toHaveBeenCalledWith({
      data: {
        email: 'user@company.com',
        role: 'ADMIN',
        company: {connect: {id: 'uuid-123'}},
      },
    });
    expect(result).toEqual({id: 1, ...dto});
  });
});
