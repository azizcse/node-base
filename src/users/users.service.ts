import { Injectable } from '@nestjs/common';
import { User } from './entities/User.entity';
import { CreateProfileParams, CreateUserParam } from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './entities/Profile.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository:Repository<Profile>,
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

  async createProfile(id:number, profileDate:CreateProfileParams){
    const userObj = await this.userRepository.findOneBy({ id });
    const newProfile = this.profileRepository.create({...profileDate});
    userObj.profile = await this.profileRepository.save(newProfile);
    return this.userRepository.save(userObj);
  }

}
