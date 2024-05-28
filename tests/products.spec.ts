import { test, expect } from '@playwright/test';

test.describe('API Requests', () => {
  const USER = {
    email: 'customer@test.com',
    password: 'test123',
    accessToken: '',
  };

  test.beforeAll(async ({ request }) => {
    const response = await request.post('auth/login', {
      data: {
        "email": USER.email,
        "password": USER.password,
      },
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    USER.accessToken = responseBody.token;
  });

  test('Get product list', async ({ request }) => {
    const response = await request.get('products', {
      headers: {
        Authorization: `Bearer ${USER.accessToken}`,
      },
    });

    expect(response.status()).toBe(200);
  });

  test('Get a single product', async ({ request }) => {
    const response = await request.get('product/1', {
      headers: {
        Authorization: `Bearer ${USER.accessToken}`,
      },
    });

    expect(response.status()).toBe(200);
  });
});
