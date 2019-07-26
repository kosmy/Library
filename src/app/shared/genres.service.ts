import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Genre } from './genre';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private url: string = 'http://localhost:2403/genres'

  constructor(private httpClient: HttpClient) { }
  getGenres(): Observable<any> {
    return this.httpClient.get(this.url).pipe(map(response => response))
  }

  addGenre(genre: Genre): Observable<any> {
    return this.httpClient.post(this.url, genre).pipe(map(response => response))
  }

  editGenre(genre: Genre): Observable<any> {
    return this.httpClient.put(this.url + '/' + genre.id, genre).pipe(map(response => response))
  }

  deleteGenre(id: string): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id).pipe(map(response => response))
  }
  getCertainGenre(id: string): Observable<any> {
    return this.httpClient.get(this.url + "/" + id).pipe(map(response => response))
  }
}
