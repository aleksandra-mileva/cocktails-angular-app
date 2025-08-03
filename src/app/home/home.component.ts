import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {HomeService} from './home.service';
import {HomeView} from '../types/homeView';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeView!: HomeView;

  constructor(private homeService: HomeService, private router: Router) {
  }

  ngOnInit(): void {
    this.homeService.getHomePageCocktail().subscribe({
      next: (data) => this.homeView = data,
      error: (err) => console.error('Failed to fetch home page cocktail', err)
    });
  }
}
