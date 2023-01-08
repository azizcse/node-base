import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/User.entity';
import { CreateProfileParams, CreateUserParam } from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './entities/Profile.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private readonly mailService: MailService,
  ) {
  }


  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  async createUser(userDetails: CreateUserParam) {
    try {
      const { name, email, password } = userDetails;
      const hash = await bcrypt.hash(password, 12);
      const newUser = this.userRepository.create({ name:name,email:email, password: hash, createdAt: new Date() });

      let value = await this.userRepository.save(newUser);
      console.log('User create success---------' + value);
      this.mailService.sendRegisterEmail(name, email, value.id);
      return value;
    } catch (e) {
      console.log('User create exception---------');
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

  }

  findByEmail(email: string): Promise<User | undefined> {
    const user = this.userRepository.findOneBy({ email });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }


  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  async createProfile(id: number, profileDate: CreateProfileParams) {
    const userObj = await this.userRepository.findOneBy({ id });
    const newProfile = this.profileRepository.create({ ...profileDate });
    userObj.profile = await this.profileRepository.save(newProfile);
    return this.userRepository.save(userObj);
  }

}
