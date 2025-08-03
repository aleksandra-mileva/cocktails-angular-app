import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HomeView} from '../types/homeView';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {}

  getHomePageCocktail() {
    console.log('call home service')
    return this.http.get<HomeView>('/api/');
  }
}
