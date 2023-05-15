import { z } from 'zod';

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullable(),
  duration: z.number().positive(),
  price: z.number().positive().int(),
});

const movieRequestSchema = movieSchema
  .omit({ id: true })
  .partial({ description: true });

const movieUpdateRequestSchema = movieRequestSchema.partial();

const moviesResponseSchema = z.array(movieSchema);

export { movieSchema, movieRequestSchema, movieUpdateRequestSchema, moviesResponseSchema };
