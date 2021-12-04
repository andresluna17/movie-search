import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { SearchDto } from './dto/search.dto';
import { HistorySearch } from './entities/history-search.entity';
import { HistorySearchRepository } from './repositories/history-search.repository';

@Injectable()
export class HistorySearchService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly historySearchRepostory: HistorySearchRepository,
  ) {}

  async saveHistorySearch(search: SearchDto) {
    const user = search.user
      ? await this.userRepository.findById(search.user.id)
      : null;
    const historySearch = new HistorySearch();
    historySearch.user = user;
    historySearch.year = search.year;
    historySearch.director = search.director;
    historySearch.genres = search.genres;
    historySearch.title = search.title;
    historySearch.ip = search.ip;
    await this.historySearchRepostory.created(historySearch);
  }
}
