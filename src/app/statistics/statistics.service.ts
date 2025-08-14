import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, Observable} from 'rxjs';
import {StatisticsView} from '../types/statisticsView';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<StatisticsView> {
    return this.http.get<StatisticsView>('/api/statistics')
      .pipe(delay(2000));
  }
}
