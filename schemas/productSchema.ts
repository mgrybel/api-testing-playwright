import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  stock: z.number()
});

export const productsSchema = z.array(productSchema);