import { Injectable } from '@nestjs/common';
import {
  Client,
  WebhookEvent,
  MessageEvent,
  PostbackEvent,
  FollowEvent,
  UnfollowEvent,
} from '@line/bot-sdk';
import { Request, Response } from 'express';
import { LineApiService } from 'src/common/lineapi/lineapi.service';
import axios from 'axios';
import { MessageType } from './messagetype/messagetype.config';

@Injectable()
export class EventUserService {
  private client: Client;
  constructor(private readonly lineApi: LineApiService) {
    this.client = new Client({
      channelAccessToken: process.env.CHANNELACCESSTOKEN_USER || '',
      channelSecret: process.env.CHANNELSECRET_USER || '',
    });
  }
  async handleEvent(req: Request, event: WebhookEvent): Promise<any> {
    switch (event.type) {
      case 'message': {
        const messageEvent = event as MessageEvent;
        switch (messageEvent.message.type) {
          case 'text':
            return await this.handleText(req, messageEvent);
          case 'location':
            return await this.handleLocation(req, messageEvent);
          case 'image':
          case 'video':
            return await this.getImageOrVideo(req, messageEvent);
          default:
            console.log(`Unknown message type: ${messageEvent.message.type}`);
            return false;
        }
      }
      case 'postback': {
        const postbackEvent = event as PostbackEvent;
        return await this.handlePostback(req, postbackEvent);
      }
      case 'follow': {
        const followEvent = event as FollowEvent;
        return await this.handleFollow(followEvent);
      }
      case 'unfollow': {
        const unfollowEvent = event as UnfollowEvent;
        return false;
      }
      default:
        console.log(`Unknown event type: ${event.type}`);
        return false;
    }
  }

  async handleText(req: Request, event: MessageEvent): Promise<any> {
    const { replyToken } = event;
    const text = await MessageType.textConfig.getHello2();
    this.client.replyMessage(replyToken, text);
  }

  async handleLocation(req: Request, event: MessageEvent): Promise<any> {
    return;
  }

  async getImageOrVideo(req: Request, event: MessageEvent): Promise<any> {
    return;
  }

  async handlePostback(req: Request, event: PostbackEvent): Promise<any> {
    return;
  }

  async handleFollow(event: FollowEvent): Promise<any> {
    const { replyToken } = event;

    const getprofile = await this.lineApi.getUserProfile(
      event.source.userId as string,
    );
    const name = getprofile.displayName;
    this.client.replyMessage(replyToken, {
      type: 'text',
      text: `สวัสดีคุณ ${name}`,
    });
  }
}
