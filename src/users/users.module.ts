import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Profile } from './entities/Profile.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[TypeOrmModule.forFeature([User, Profile]),MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
