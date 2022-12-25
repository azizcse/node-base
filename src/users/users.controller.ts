import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService,
              private mailService:MailerService) {
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.createUser(createUserDto);
    const result = await this.sendEmail()
    console.log(result);
    return user;
  }

  async sendEmail(){
    return this.mailService.sendMail({
      to:"imazizul@gmail.com",
      from:'imazizul@gmail.com',
      subject:"This is test email",
      text:"Welcome to nest js mailer"
    });
  }


  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@Req() request) {
    const userId = request.user.userId;
    return this.userService.findOne(userId);
  }
}
