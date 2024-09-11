import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DialogflowService {
  async postToDialogflow(option: {
    req: any;
    headers: any;
    body: any;
  }): Promise<any> {
    const { headers, body } = option;
    headers.host = 'dialogflow.cloud.google.com';
    try {
      const response = await axios.post(
        `https://dialogflow.cloud.google.com/v1/integrations/line/webhook/${process.env.INTEGRATION_ID}`,
        body,
        { headers },
      );
      return response.data;
    } catch (error) {
      console.error('Error in postToDialogflow:', error);
      throw error;
    }
  }
}
