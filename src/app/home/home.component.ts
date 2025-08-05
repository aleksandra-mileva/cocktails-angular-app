import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HomeService} from './home.service';
import {HomeView} from '../types/homeView';
import {ErrorService} from '../error/error.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeView!: HomeView;

  constructor(
    private homeService: HomeService,
    private errorService: ErrorService,
  ) {
  }

  ngOnInit(): void {
    this.homeService.getHomePageCocktail().subscribe({
      next: (data) => this.homeView = data,
      error: (err) => this.errorService.navigateToErrorPage(err)
    });
  }
}
