import { Request, Response } from 'express';
import {
  TMovie,
  TMovieRequest,
  TMovieResponse,
  TMovieUpdate,
  TMovieWithPage,
} from '../interfaces/movies.interface';
import createMovieService from '../services/createMovie.service';
import deleteMovieService from '../services/deleteMovie.service';
import updateMovieService from '../services/updateMovie.service';
import listAllMoviesService from '../services/listMovies.service';
import { number } from 'zod';

const createMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieDataRequest: TMovieRequest = request.body;
  const movieCreated = await createMovieService(movieDataRequest);
  return response.status(201).json(movieCreated);
};

const listAllMoviesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { perPage, page, sort, order } = request.query;

  const allMovies: TMovieWithPage = await listAllMoviesService(
    Number(page),
    Number(perPage),
    String(sort),
    String(order)
  );
  return response.status(200).json(allMovies);
};

const updateMovieController = async (request: Request, response: Response) => {
  const movieId: number = Number(request.params.id);
  const movieData: TMovieUpdate = request.body;
  const updatedMovie = await updateMovieService(movieId, movieData);
  return response.status(200).json(updatedMovie);
};

const deleteMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieId: number = Number(request.params.id);
  await deleteMovieService(movieId);
  return response.status(204).send();
};

export {
  createMovieController,
  listAllMoviesController,
  updateMovieController,
  deleteMovieController,
};
