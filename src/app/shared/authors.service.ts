import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Author } from './author';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private url: string = 'http://localhost:2403/authors'

  constructor(private httpClient: HttpClient) { }

  getAuthors(): Observable<any> {
    return this.httpClient.get(this.url).pipe(map(response => response))
  }

  addAuthor(author: Author): Observable<any> {
    return this.httpClient.post(this.url, author).pipe(map(response => response))
  }

  editAuthor(author: Author): Observable<any> {
    return this.httpClient.put(this.url + '/' + author.id, author).pipe(map(response => response))
  }

  deleteAuthor(id: string): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id).pipe(map(response => response))
  }
  getCertainAuthor(id: string): Observable<any> {
    return this.httpClient.get(this.url + "/" + id).pipe(map(response => response))
  }
}
