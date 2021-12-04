import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistorySearch } from '../entities/history-search.entity';

export class HistorySearchRepository {
  constructor(
    @InjectModel(HistorySearch.name)
    private readonly historySearchModel: Model<HistorySearch>,
  ) {}

  created(historySearch: HistorySearch) {
    return this.historySearchModel.create(historySearch);
  }
}
