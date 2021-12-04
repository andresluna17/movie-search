import { forwardRef, Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { HistorySearch } from './entities/history-search.entity';
import { HistorySearchRepository } from './repositories/history-search.repository';
import { UserModule } from '../user/user.module';
import { HttpModule } from '@nestjs/axios';
import { MovieApiService } from './api/movie-api.service';
import { ConfigService } from 'src/config/config.service';
import { HistorySearchService } from './history-search.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HistorySearch.name,
        schema: SchemaFactory.createForClass(HistorySearch),
      },
    ]),
    forwardRef(() => UserModule),
    HttpModule,
  ],
  controllers: [SearchController],
  providers: [
    ConfigService,
    MovieApiService,
    SearchService,
    HistorySearchService,
    HistorySearchRepository,
  ],
})
export class SearchModule {}
