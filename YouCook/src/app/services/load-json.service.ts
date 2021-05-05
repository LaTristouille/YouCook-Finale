import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadJsonService {

  constructor(private readonly http: HttpClient) { }

  getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }
}
