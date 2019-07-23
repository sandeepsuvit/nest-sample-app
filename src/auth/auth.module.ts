import { CoreModule } from './../core/core.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CoreModule,
    UserModule,
    JwtModule.register({ secret: process.env.SECRET }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
