import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
  searchForm: FormGroup;
  results: Observable<{}[]>;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });

    this.results = this.searchForm.controls.search.valueChanges.pipe( // Observable Form
      filter(value => value.length > 2),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => this.http.get<YouTubeResult>(`${API_URL}?q=${query}&key=${API_KEY}&part=snippet`)), // Observable Http
      map(res => res.items)
    );
  }
}




















