import { Body, Controller, Delete, Get, Ip, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import RefreshTokenDto from './dtos/refresh-token.dto';
import {encode, decode} from 'url-safe-base64';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    console.log("IP address :"+ip);

    return this.authService.login(body.email, body.password, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    });
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }

  @Get('test-api')
  encodeTest(){

    const encode = Buffer.from("Aziz 1y 9776+   86",'utf8').toString('base64')
    console.log(encode)
    const plain = Buffer.from(encode, 'base64').toString('utf8')
    console.log(plain)
    return {message:"Hello"}
  }

}
