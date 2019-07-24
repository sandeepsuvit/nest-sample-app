import { HttpErrorFilter } from './filters/http-error.filter';
import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    SharedService,
  ],
  exports: [
    SharedService,
  ],
})
export class SharedModule {}
