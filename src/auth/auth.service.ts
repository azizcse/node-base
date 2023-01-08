import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/User.entity';
import { UsersService } from 'src/users/users.service';
import { RefreshToken } from './entities/auth-token.entity';
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService) {
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const userId = await this.retrieveRefreshToken(refreshStr);
    console.log(userId);
    if (!userId) {
      return undefined;
    }

    const user = await this.userService.findOne(userId);
    if (!user) {
      return undefined;
    }
    console.log(user.name);
    const accessToken = {
      userId: userId,
    };

    return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  }

  private async retrieveRefreshToken(
    refreshStr: string,
  ): Promise<number | undefined> {
    try {
      const decoded = await verify(refreshStr, process.env.REFRESH_SECRET);
      if (typeof decoded === 'string') {
        return undefined;
      }
      console.log(decoded)
      return Promise.resolve(decoded.id)

    } catch (e) {
      return undefined;
    }
  }


  async login(email: string, password: string, values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return undefined;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return undefined;
    }
    return this.newRefreshAndAccessToken(user, values);
  }


  private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string, id: number, name: string }> {

    let payload = {
      userId:user.id,
      email:user.email,
      name:user.name,
    }

    return {
      refreshToken: sign(payload, process.env.REFRESH_SECRET),
      accessToken: sign(
        payload,
        process.env.ACCESS_SECRET,
        {
          expiresIn: '1m',
        },
      ),
      id: user.id,
      name: user.name,
    };
  }

  async logout(refreshStr: string): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      return;
    }
    // delete refreshtoken from db
    /*this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.id !== refreshToken.id,
    );*/
  }
}
