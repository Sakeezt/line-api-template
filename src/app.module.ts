import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventUserModule } from './modules/eventuser/eventuser.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
