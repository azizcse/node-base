import { Injectable } from '@nestjs/common';
import { User } from './entities/User.entity';
import { CreateUserParam } from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
  }

  async createUser(userDetails: CreateUserParam) {
    const { password, ...rest } = userDetails;
    const hash = await bcrypt.hash(password, 12);
    const newUser = this.userRepository.create({ ...rest, password: hash, createdAt: new Date() });
    return this.userRepository.save(newUser);
  }

  findByEmail(email: string): Promise<User | undefined> {
    const user = this.userRepository.findOneBy({ email });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  findOne(id: number): Promise<User | undefined> {
    const user = this.userRepository.findOneBy({ id });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

}
