import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { IsUnique } from '@youba/nestjs-dbvalidator';
import { User } from '../entities/User.entity';
import { Unique } from '../../common';

export class CreateUserDto{
  @ApiProperty()
  @IsNotEmpty()
  name:string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email:string;
  
  @ApiProperty()
  @IsNotEmpty()
  password:string;
}