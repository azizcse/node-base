import {MailerService} from '@nestjs-modules/mailer';

export class Mailer{
  mailService : MailerService
  constructor(mailService) {
    this.mailService = mailService
  }
  async sendRegistrationEmail(){
    return this.mailService.sendMail({
      to: 'azizul@w3engineers.com',
      from: "imazizul@gmail.com",
      subject: 'This is test email',
      text: 'Welcome to nest js mailer',
    });
  }
}