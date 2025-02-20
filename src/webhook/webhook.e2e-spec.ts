describe('Webhook API (e2e)', () => {
    it('should auto-reply with help response', async () => {
      const response = await request(app.getHttpServer())
        .post('/webhook')
        .send({ message: 'help', phone: '+1234567890' });
  
      expect(response.status).toBe(200);
      expect(response.body.reply).toBe('Support contact: support@company.com');
    });
  });
  