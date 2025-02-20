import { Controller, Post, Body, Headers, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { ConfigService } from '@nestjs/config';

@Controller('webhook')
export class WebhookController {
  constructor(private firebaseService: FirebaseService, private configService: ConfigService) {}

  @Post()
  async handleWebhook(@Headers('authorization') authHeader: string, @Body() body: any) {
    const secret = this.configService.get<string>('SECRET_TOKEN');
    if (!authHeader || authHeader !== `Bearer ${secret}`) {
      throw new BadRequestException('Invalid token');
    }

    if (!body.message || !body.phone) {
      throw new BadRequestException('Invalid payload');
    }

    const db = this.firebaseService.getDb();
    await db.collection('messages').add(body);

    if (body.message.toLowerCase().includes('help')) {
      return { reply: 'Support contact: support@company.com' };
    }

    return { success: true };
  }
}
