import { Router } from 'express';
import {
  createMovieController,
  deleteMovieController,
  listAllMoviesController,
  updateMovieController,
} from '../controllers/movies.controller';
import verifyBodyRequestMiddleware from '../middlewares/verifyRequestBody.middleware';
import {
  movieRequestSchema,
  movieUpdateRequestSchema,
} from '../schemas/movies.schemas';
import verifyMovieExistsMiddleware from '../middlewares/verifMovieExists.middleware';
import verifyIdExistsMiddleware from '../middlewares/verifyIdExists.middleware';

const movieRouter: Router = Router();

movieRouter.post(
  '',
  verifyBodyRequestMiddleware(movieRequestSchema),
  verifyMovieExistsMiddleware,
  createMovieController
);

movieRouter.get('', listAllMoviesController);

movieRouter.patch(
  '/:id',
  verifyBodyRequestMiddleware(movieUpdateRequestSchema),
  verifyIdExistsMiddleware,
  verifyMovieExistsMiddleware,
  updateMovieController
);

movieRouter.delete('/:id', verifyIdExistsMiddleware, deleteMovieController);

export { movieRouter };
