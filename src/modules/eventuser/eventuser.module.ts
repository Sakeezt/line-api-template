import { Module } from '@nestjs/common';
import { EventUserController } from './eventuser.controller';
import { EventUserService } from './eventuser.service';
import { DialogflowModule } from 'src/common/dialogflow/dialogflow.module';
import { lineApiModule } from 'src/common/lineapi/lineapi.module';

@Module({
  imports: [DialogflowModule, lineApiModule],
  controllers: [EventUserController],
  providers: [EventUserService],
})
export class EventUserModule {}
