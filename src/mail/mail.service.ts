import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Templates } from './template/Templates';

@Injectable()
export class MailService {
  constructor(private mailerService:MailerService) {
  }

  async sendRegisterEmail(name:string, email:string, userId: number){
    try{
      const encode = Buffer.from(userId.toString(),'utf8').toString('base64')
      let url = process.env.API_DOMAIN+"/auth/verify?id="+encode
      let value = await  this.mailerService.sendMail({
        "from": process.env.SENDER_EMAIL,
        "to": email,
        "subject": "User registration",
        "html": Templates.getRegisterEmailTemplate(url, name)
      });
      return "Register email has send"
    }catch (e) {
      return "Email send failed :"+e
    }

    //await this.mailerService.sendMail({});
  }
}
