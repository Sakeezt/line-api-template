import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LineApiService {
  async getUserProfile(userId: string) {
    try {
      const url = `https://api.line.me/v2/bot/profile/${userId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.CHANNELACCESSTOKEN_USER}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  async callContentLine(contentid: string): Promise<Buffer> {
    const url = `https://api-data.line.me/v2/bot/message/${contentid}/content`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.CHANNELACCESSTOKEN_USER}`,
        },
        responseType: 'arraybuffer',
      });

      const buffer = Buffer.from(response.data);
      return buffer;
    } catch (error) {
      // Handle error appropriately
      console.error('Error fetching content:', error);
      throw error;
    }
  }

  async createRichMenu(body: object): Promise<string> {
    const url = 'https://api.line.me/v2/bot/richmenu';
    const headers = {
      Authorization: `Bearer ${process.env.CHANNELACCESSTOKEN_USER}`,
      'Content-Type': 'application/json',
    };
    try {
      const response = await axios.post(url, body, { headers });
      return response.data.richMenuId;
    } catch (error) {
      throw error;
    }
  }

  async setRichMenuForUser(userId: string, richMenuId: string): Promise<void> {
    const url = `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`;
    const headers = {
      Authorization: `Bearer ${process.env.CHANNELACCESSTOKEN_USER}`,
    };

    try {
      await axios.post(url, null, { headers });
    } catch (error) {
      throw error;
    }
  }
}
