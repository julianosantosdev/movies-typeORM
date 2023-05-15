import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Movie } from '../entities';
import { AppDataSource } from '../data-source';
import { AppError } from '../error';

const verifyMovieExistsMiddleware = async (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  const movieName: string = request.body.name;

  if (movieName) {
    const movieRepository: Repository<Movie> =
      AppDataSource.getRepository(Movie);

    const movieExists = await movieRepository.exist({
      where: { name: movieName },
    });

    if (movieExists) {
      throw new AppError('Movie already exists.', 409);
    }
  }

  nextFunction();
};

export default verifyMovieExistsMiddleware;
