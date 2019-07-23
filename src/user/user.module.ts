import { SharedModule } from './../shared/shared.module';
import { CoreModule } from './../core/core.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

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
