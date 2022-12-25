import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@Req() request) {
    const userId = request.user.userId;
    return this.userService.findOne(userId);
  }
}
