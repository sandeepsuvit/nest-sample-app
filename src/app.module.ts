import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    // Database configuration
    MongooseModule.forRoot(process.env.DATABASE_URL, databaseConfig),
    CoreModule,
    AuthModule,
    UserModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
