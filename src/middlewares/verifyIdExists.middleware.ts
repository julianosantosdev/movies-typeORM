import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { AppError } from '../error';

const verifyIdExistsMiddleware = async (
  request: Request,
  response: Response,
  nextFunction: NextFunction
): Promise<Response | void> => {
  const MovieId: number = Number(request.params.id);
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const findMovie: Movie | null = await movieRepository.findOneBy({
    id: MovieId,
  });

  if (findMovie === null) {
    throw new AppError('Movie not found', 404);
  }
  return nextFunction();
};

export default verifyIdExistsMiddleware;
