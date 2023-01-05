import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostParams } from '../utils/types';
import { User } from 'src/users/entities/User.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    private userService: UsersService,
    @InjectRepository(Post) private postRepository: Repository<Post>) {
  }

  async create(userId: number, createPostParams: CreatePostParams) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPost = this.postRepository.create({ ...createPostParams, user });
    return this.postRepository.save(newPost);
  }

  async findAll(userId: number) {
    //return this.postRepository.query(`SELECT * FROM posts WHERE user=${userId}`)
    const user = await this.userService.findById(userId);
    return this.postRepository.findBy({ user });
  }

  findOne(id: number) {
    return this.postRepository.findBy({ id });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
