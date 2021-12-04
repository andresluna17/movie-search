import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Configuration } from 'src/config/config.keys';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class MovieApiService {
  private url = 'https://api.themoviedb.org/3';
  private apiKey;

  constructor(
    private http: HttpService,
    private _configService: ConfigService,
  ) {
    this.apiKey = this._configService.get(Configuration.API_KEY);
  }

  searchMovies(query: string, date?: Date): Observable<AxiosResponse<any>> {
    return this.http.get(
      `${this.url}/search/movie?query=${query}&api_key=${this.apiKey}${
        date ? '&primary_release_year=' + date : ''
      }`,
    );
  }

  getGenres(): Observable<AxiosResponse<any>> {
    return this.http.get(`${this.url}/genre/movie/list?api_key=${this.apiKey}`);
  }
}
