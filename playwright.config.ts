import { defineConfig } from '@playwright/test';
import './fixtures/toMatchSchema';

export default defineConfig({
  use: {
    // All requests we send go to this API endpoint
    baseURL: 'http://localhost:8080/v1/',
  },
});
