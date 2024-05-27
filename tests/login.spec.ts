import { test, expect } from '@playwright/test';

test.describe('API Requests', () => {
  const USER = {
    email: 'customer@test.com',
    password: 'test123',
  };

  test.only('API POST Request', async ({ request }) => {
    const response = await request.post('http://localhost:8080/v1/auth/login', {
      data: {
        "email": USER.email,
        "password": USER.password,
      },
    });

    expect(response.status()).toBe(200);
    console.log(await response.json());
  });
});
