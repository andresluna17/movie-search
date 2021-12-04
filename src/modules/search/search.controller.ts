import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';
import { RealIP } from 'nestjs-real-ip';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-auth.guard';
import { MovieApiService } from './api/movie-api.service';
import { map } from 'rxjs';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly movieApiService: MovieApiService,
  ) {}

  @Get('/genres')
  getGenres() {
    return this.movieApiService.getGenres().pipe(map((res) => res.data.genres));
  }

  @Get('/:title')
  @UseGuards(OptionalJwtAuthGuard)
  async findOne(
    @Param('title') title: string,
    @Query() { year, director, genres, limit },
    @RealIP() ip,
    @Request() { user },
  ): Promise<any> {
    const genresArray = genres
      ?.split(',')
      .map((genre) => parseInt(genre.trim()));
    return this.searchService.findMovie({
      title,
      year,
      director,
      ip,
      genres: genresArray,
      limit: limit ?? 10,
      user,
    } as SearchDto);
  }
}
