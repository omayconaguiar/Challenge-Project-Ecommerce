// test/unit/auth.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Fazemos mock de bcrypt para manipular compare e hash nos testes
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService (Unit)', () => {
  let authService: AuthService;

  // Mock do PrismaService. Para que o TS aceite, usamos “as unknown as PrismaService”
  let prismaMock = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  } as unknown as PrismaService;

  // Mock do JwtService
  let jwtMock = {
    sign: jest.fn(() => 'mockedToken'),
    verify: jest.fn(),
  } as unknown as JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);

    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('lança NotFoundException se o usuário não for encontrado', async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.login('nonexistent@example.com', 'secret'),
      ).rejects.toThrowError('User not found');
    });

    it('lança UnauthorizedException se a senha for inválida', async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: '123',
        password: 'hashed-pass',
      });

      // Fazemos o compare retornar falso
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login('some@example.com', 'wrong'),
      ).rejects.toThrowError('Invalid credentials');
    });

    it('retorna tokens se usuário e senha forem válidos', async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: '123',
        password: 'hashed-pass',
        role: 'USER',
      });

      // compare retorna true
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.login('some@example.com', 'correct');

      expect(jwtMock.sign).toHaveBeenCalled();
      expect(result.access_token).toBe('mockedToken');
      expect(result.refresh_token).toBeDefined();
    });
  });

  describe('register', () => {
    it('lança ConflictException se o email já estiver em uso', async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({ id: '999' });

      await expect(
        authService.register({ email: 'test@example.com', password: '123' }),
      ).rejects.toThrowError('Email is already in use');
    });

    it('cria e retorna o usuário em caso de sucesso', async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

      (prismaMock.user.create as jest.Mock).mockResolvedValue({
        id: '111',
        email: 'new@example.com',
        role: 'USER',
      });

      // Mock do bcrypt.hash para retornar 'hashed-password'
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

      const user = await authService.register({
        email: 'new@example.com',
        password: 'pass',
      });

      expect(user.email).toBe('new@example.com');
      expect(user.role).toBe('USER');
      expect(bcrypt.hash).toHaveBeenCalledWith('pass', 10);
    });
  });
});
