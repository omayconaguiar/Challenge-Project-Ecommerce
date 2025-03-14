import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from '../../src/user/user.service';
import {PrismaService} from '../../src/prisma/prisma.service';

describe('UserService (Unit)', () => {
  let userService: UserService;

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      findFirst: jest.fn(),
      findFirstOrThrow: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      createMany: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      upsert: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {provide: PrismaService, useValue: prismaMock}],
    }).compile();

    userService = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  // it('create user success', async () => {
  //   (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);
  //   (prismaMock.user.create as jest.Mock).mockResolvedValue({
  //     id: 'abc',
  //     email: 'test@example.com',
  //   });
  //
  //   const user = await userService.create({
  //     email: 'test@example.com',
  //     password: '123',
  //   });
  //
  //   expect(user.id).toBe('abc');
  //   expect(user.email).toBe('test@example.com');
  // });
});
