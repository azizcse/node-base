import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { CreateProfileDto } from './dtos/CreateProfile.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Mailer } from '../utils/mailer';

@ApiTags("User")
@Controller('users')
export class UsersController {
  mailer:Mailer
  constructor(private readonly userService: UsersService,
              private mailService: MailerService) {
    this.mailer = new Mailer(mailService)
  }

  @Get()
  getUsers(){
    return this.userService.getAllUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    //this.sendEmail();
    //console.log(result);
    const {password, ...rest} = user
    return rest;
  }

  async sendEmail() {
    return await this.mailer.sendRegistrationEmail();
    /*return this.mailService.sendMail({
      to: 'imazizul@gmail.com',
      from: 'imazizul@gmail.com',
      subject: 'This is test email',
      text: 'Welcome to nest js mailer',
    });*/
  }


  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@Req() request) {
    const userId = request.user.userId;
    console.log(userId)
    return this.userService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  createUserProfile(@Req() request, @Body() createProfileDto: CreateProfileDto) {
    console.log(createProfileDto)
    return this.userService.createProfile(request.user.userId, createProfileDto)
  }

  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: number){
    return this.userService.findById(id)
  }

}
