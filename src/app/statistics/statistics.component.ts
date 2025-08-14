import {Component, OnInit} from '@angular/core';
import {StatisticsView} from '../types/statisticsView';
import {StatisticsService} from './statistics.service';
import {ErrorService} from '../error/error.service';
import {LoaderComponent} from '../shared/loader/loader.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    LoaderComponent,
    DatePipe
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  statistics: StatisticsView | null = null;
  isLoading: boolean = true;

  constructor(
    private statisticsService: StatisticsService,
    private errorService: ErrorService
  ) {
  }

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.isLoading = true;

    this.statisticsService.getStatistics().subscribe({
      next: (response: StatisticsView) => {
        this.statistics = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.navigateToErrorPage(err);
      }
    })
  }
}
