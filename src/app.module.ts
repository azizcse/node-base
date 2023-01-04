import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/User.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { PostsModule } from './posts/posts.module';
import { Profile } from './users/entities/Profile.entity';
import { Post } from './posts/entities/post.entity';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: "postgres",
      database: process.env.DB_NAME,
      entities: [User,Profile, Post],
      synchronize: true,
    }),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port:587,
        auth:{
          user:'imazizul@gmail.com',
          pass:'yftompersvcpvgmk',
        }
      },
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
