import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EventUserService } from './eventuser.service';

@Controller('webhook')
export class EventUserController {
  constructor(private readonly lineOaService: EventUserService) {}

  @Post()
  async handleUserEvent(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const events = req.body.events;
      await events.map((event: any) =>
        this.lineOaService.handleEvent(req, event),
      );
      res.status(200).end();
    } catch (error) {
      console.log('error', error);
    }
  }
}
