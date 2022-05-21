import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, filter, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { API_KEY } from './api-key';

const API_URL = 'https://api.giphy.com/v1/gifs/search';

interface Result {
  id: string;
  url: string;
  images: {
    preview_gif: {
      url: string;
    }
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  search = new FormControl('');
  results: Observable<Result[]>;

  constructor(private http: HttpClient) {
    this.results = this.search.valueChanges.pipe(
      filter(value => value.length > 2),
      debounceTime(600),
      distinctUntilChanged(),
      switchMap(query => this.http.get<any>(`${API_URL}?q=${query}&api_key=${API_KEY}&rating=g&limit=30`)),
      map(res => res.data as Result[])
    );
  }
}




















