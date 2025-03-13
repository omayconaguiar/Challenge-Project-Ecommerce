import prisma from '../../prisma/prismaClient';
import { CreateUserDTO, UpdateUserDTO } from '../types/user.dto';
import { hashPassword, optimizeQuery } from '../helpers/utils';

class UserService {
  async findAll() {
    // Exemplo de "query optimization": se tivéssemos joins ou selects específicos
    // poderíamos montar algo customizado. Aqui é bem simples.
    return prisma.user.findMany({
      // ...colocar campos/relations específicos se preciso
    });
  }

  async findOne(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserDTO) {
    const hashed = hashPassword(data.password);
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashed,
      },
    });
  }

  async update(id: number, data: UpdateUserDTO) {
    // Se data.password existe, hashear
    if (data.password) {
      data.password = hashPassword(data.password);
    }
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await prisma.user.delete({
      where: { id },
    });
    return;
  }
}

export const userService = new UserService();