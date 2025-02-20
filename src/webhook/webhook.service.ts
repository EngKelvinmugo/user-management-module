import { Injectable, BadRequestException } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { RateLimiterMemory } from 'rate-limiter-flexible';

@Injectable()
export class WebhookService {
  private firestore: Firestore;
  private messagesCollection = 'messages';

  private rateLimiter = new RateLimiterMemory({
    points: 5, // 5 requests
    duration: 60, // per 60 seconds
  });

  constructor() {
    this.firestore = new Firestore();
  }

  async handleIncomingMessage(phone: string, message: string) {
    try {
      await this.rateLimiter.consume(phone);
    } catch {
      throw new BadRequestException('Too many requests, please try again later.');
    }

    const newMessage = {
      phone,
      message,
      timestamp: new Date(),
    };

    await this.firestore.collection(this.messagesCollection).add(newMessage);

    if (message.toLowerCase().includes('help')) {
      return { reply: 'Support contact: support@company.com' };
    }

    return { status: 'Message received' };
  }
}
