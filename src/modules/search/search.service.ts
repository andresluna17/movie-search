import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { MovieApiService } from './api/movie-api.service';
import { catchError, map } from 'rxjs';
import { HistorySearchService } from './history-search.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly movieApiService: MovieApiService,
    private historySearchService: HistorySearchService,
  ) {}

  async findMovie(search: SearchDto) {
    return this.movieApiService
      .searchMovies(search.title, search.year)
      .pipe(
        map(async (res) => {
          this.historySearchService.saveHistorySearch(search);
          if (search.limit && res.data.results.length > 10) {
            res.data.results = res.data.results.slice(
              0,
              search.limit < 10 ? 10 : search.limit,
            );
          }

          if (search.genres) {
            res.data.results = res.data.results.filter((movie) =>
              movie.genre_ids.some((genre) => search.genres.includes(genre)),
            );
          }
          if (res.data.results.length === 0) {
            throw new HttpException('No results found', HttpStatus.NOT_FOUND);
          }
          return res.data.results;
        }),
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }),
      );
  }
}
