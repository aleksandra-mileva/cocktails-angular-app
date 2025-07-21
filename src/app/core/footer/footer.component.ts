import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconAnchor} from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconAnchor
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
