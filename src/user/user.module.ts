import { Module } from '@nestjs/common';
import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    CoreModule,
    SharedModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [
    UserService,
  ],
})
export class UserModule {}
