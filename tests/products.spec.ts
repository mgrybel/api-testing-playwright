import { test, expect } from '@playwright/test';
import { productSchema, productsSchema } from '../schemas/productSchema';

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

    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(() => productsSchema.parse(responseBody)).not.toThrow();
  });

  test('Get a single product', async ({ request }) => {
    const response = await request.get('product/1', {
      headers: {
        Authorization: `Bearer ${USER.accessToken}`,
      },
    });

    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(() => productSchema.parse(responseBody)).not.toThrow();
    expect(responseBody).toEqual({
      id: 1,
      name: 'Laptop',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam faucibus sapien massa, ut fringilla sapien facilisis pellentesque. Nulla facilisi. Sed sed blandit justo, non malesuada libero. Ut pulvinar magna vitae nulla placerat eleifend.',
      price: 10,
      imageUrl: '/products/product-1.jpeg',
      stock: 99997
    });
  });
});
