import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import {
  TMovie,
  TMovieWithPage,
  TMoviesResponse,
} from '../interfaces/movies.interface';
import { moviesResponseSchema } from '../schemas/movies.schemas';

const listAllMoviesService = async (
  page: number,
  perPage: number,
  sort: string,
  order: string
): Promise<TMovieWithPage> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  let movies: Array<Movie>;
  let orderObj = {};
  let querypage = page;
  let queryPerPage = perPage;
  let prevPage: string | null;
  let nextPage: string | null;

  if (
    perPage > 0 &&
    perPage <= 5 &&
    Number.isInteger(perPage) &&
    perPage !== undefined
  ) {
    queryPerPage = perPage;
  } else {
    queryPerPage = 5;
  }

  if (page > 0 && Number.isInteger(page) && page !== undefined) {
    querypage = page;
  } else {
    querypage = 1;
  }

  if (sort === 'price' || sort === 'duration') {
    orderObj = { [sort]: order };
  } else {
    orderObj = { id: 'asc' };
  }

  if (querypage || queryPerPage) {
    movies = await movieRepository.find({
      skip: (querypage - 1) * queryPerPage,
      take: queryPerPage,
      order: orderObj,
    });
  } else if (sort) {
    movies = await movieRepository.find({ order: orderObj });
  } else {
    movies = await movieRepository.find();
  }

  const moviesList: TMoviesResponse = moviesResponseSchema.parse(movies);
  const moviesListLenght: number = (await movieRepository.find()).length;

  if (querypage - 1 < 1) {
    prevPage = null;
  } else {
    prevPage = `http://localhost:3000/movies?page=${
      querypage - 1
    }&perPage=${queryPerPage}`;
  }

  if (querypage * queryPerPage < moviesListLenght) {
    nextPage = `http://localhost:3000/movies?page=${
      querypage + 1
    }&perPage=${queryPerPage}`;
  } else {
    nextPage = null;
  }

  return {
    prevPage: prevPage,
    nextPage: nextPage,
    count: moviesListLenght,
    data: moviesList,
  };
};

export default listAllMoviesService;
