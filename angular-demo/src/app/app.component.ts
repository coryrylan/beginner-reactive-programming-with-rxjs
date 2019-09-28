import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, filter, tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { API_KEY } from './api-key';

const API_URL = 'https://www.googleapis.com/youtube/v3/search';

interface YouTubeResult {
  items: {}[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  search = new FormControl('');
  results: Observable<{}[]>;

  constructor(private http: HttpClient) {
    this.results = this.search.valueChanges.pipe(
      filter(value => value.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => this.http.get<YouTubeResult>(`${API_URL}?q=${query}&key=${API_KEY}&part=snippet`)),
      map(res => res.items)
    );
  }
}




















