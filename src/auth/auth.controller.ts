import { Body, Controller, Delete, Get, Ip, Param, Post, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import RefreshTokenDto from './dtos/refresh-token.dto';
import { encode, decode } from 'url-safe-base64';
import { MailService } from '../mail/mail.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private mailService: MailService) {
  }

  @Post('login')
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    console.log('IP address :' + ip);

    return this.authService.login(body.email, body.password, {
      ipAddress: ip,
      userAgent: request.headers['user-agent'],
    });
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    console.log("Refresh :"+body.refreshToken);
    return this.authService.refresh(body.refreshToken);
  }

  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    return this.authService.logout(body.refreshToken);
  }

  @Get('test-api')
  async encodeTest() {

    const encode = Buffer.from('Aziz 1y 9776+   86', 'utf8').toString('base64');
    console.log(encode);
    const plain = Buffer.from(encode, 'base64').toString('utf8');
    console.log(plain);
    let mesg = await this.mailService.sendRegisterEmail('Aziz', 'azizul@w3engineers.com', 5);
    return { message: 'Hello ', data: mesg };
  }

  @Get('verify')
  verifyUser(@Query('id') id: string) {
    const plain = Buffer.from(id, 'base64').toString('utf8')
    return 'Received param :' + plain;
  }

}
