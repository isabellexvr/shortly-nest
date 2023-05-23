import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDTO } from './dtos/create-user.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {

  private ROUNDS = 10;

  constructor(private usersRepository: UsersRepository) { }

  async createUser(userInfo: CreateUserDTO) {
    const user = await this.usersRepository.findByEmail(userInfo.email);

    if (user) throw new ConflictException("Já existe um usuário cadastrado com esse e-mail.")
    
    return await this.usersRepository.create({ ...userInfo, password: bcrypt.hashSync(userInfo.password, this.ROUNDS) })
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException("Usuário não encontrado.")
    return user;
}

}
