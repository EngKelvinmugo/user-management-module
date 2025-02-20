import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';
import { FirebaseService } from '../firebase/firebase.service';
import { ConfigService } from '@nestjs/config';

describe('WebhookController', () => {
  let controller: WebhookController;

  const mockFirebaseService = {};
  const mockConfigService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        { provide: FirebaseService, useValue: mockFirebaseService }, // Mock FirebaseService
        { provide: ConfigService, useValue: mockConfigService }, // Mock ConfigService
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
