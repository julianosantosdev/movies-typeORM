import { TMovie, TMovieUpdate } from '../interfaces/movies.interface';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { movieSchema } from '../schemas/movies.schemas';

const updateMovieService = async (
  movieId: number,
  movieData: TMovieUpdate
): Promise<TMovieUpdate> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movieToUpdate: Movie | null = await movieRepository.findOneBy({
    id: movieId,
  });

  const movieModified: Movie = movieRepository.create({
    ...movieToUpdate,
    ...movieData,
  });

  const movie: Movie = await movieRepository.save(movieModified);
  const movieUpdated: TMovie = movieSchema.parse(movie);

  return movieUpdated;
};

export default updateMovieService;
