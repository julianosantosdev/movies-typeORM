import { z } from 'zod';
import {
  movieRequestSchema,
  movieSchema,
  movieUpdateRequestSchema,
  moviesResponseSchema,
} from '../schemas/movies.schemas';
import { DeepPartial } from 'typeorm';

type TMovie = z.infer<typeof movieSchema>;
type TMovieRequest = z.infer<typeof movieRequestSchema>;
type TMovieResponse = z.infer<typeof movieSchema>;
type TMoviesResponse = z.infer<typeof moviesResponseSchema>;
type TMovieUpdate = DeepPartial<TMovieRequest>;
type TMovieWithPage = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TMoviesResponse;
};

export type {
  TMovie,
  TMovieRequest,
  TMovieResponse,
  TMovieUpdate,
  TMoviesResponse,
  TMovieWithPage,
};
