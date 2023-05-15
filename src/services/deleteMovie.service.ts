import { Repository } from 'typeorm';
import { Movie } from '../entities';
import { AppDataSource } from '../data-source';

const deleteMovieService = async (movieId: number): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  await movieRepository.delete({ id: movieId });
};

export default deleteMovieService;
