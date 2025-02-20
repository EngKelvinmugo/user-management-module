import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('Users API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET) should return paginated users', async () => {
    const response = await request(app.getHttpServer()).get('/users?limit=2');
    expect(response.status).toBe(200);
    expect(response.body.users.length).toBe(2);
    expect(response.body.nextCursor).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
