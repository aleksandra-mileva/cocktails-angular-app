import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  cocktail = {
    id: 1,
    pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723493424/rfx5pdjd6cpn3pbbrtcm.jpg',
    authorFullName: 'Aleksandra Mileva',
  }

  message = 'Need a non-alcoholic cocktail? This is our today\'s suggestion for you!';

  constructor(private router: Router) {}

  viewCocktail() {
    this.router.navigate(['/cocktails', this.cocktail.id]);
  }
}
