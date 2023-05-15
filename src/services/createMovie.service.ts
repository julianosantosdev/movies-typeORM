import { Repository } from 'typeorm';
import { Movie } from '../entities';
import { AppDataSource } from '../data-source';
import { TMovieRequest, TMovieResponse } from '../interfaces/movies.interface';
import { movieSchema } from '../schemas/movies.schemas';

const createMovieService = async (
  movieDataRequest: TMovieRequest
): Promise<TMovieResponse> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const movie: Movie = movieRepository.create(movieDataRequest);
  await movieRepository.save(movie);
  const movieResponse: TMovieResponse = movieSchema.parse(movie);
  return movieResponse;
};

export default createMovieService;
