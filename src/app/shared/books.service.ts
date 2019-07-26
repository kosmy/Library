import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private url: string = 'http://localhost:2403/books'

  constructor(private httpClient: HttpClient) { }
  getBooks(): Observable<any> {
    return this.httpClient.get(this.url).pipe(map(response => response))
  }

  addBook(book: Book): Observable<any> {
    return this.httpClient.post(this.url, book).pipe(map(response => response))
  }

  editBook(book: Book): Observable<any> {
    return this.httpClient.put(this.url + '/' + book.id, book).pipe(map(response => response))
  }

  deleteBook(id: string): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id).pipe(map(response => response))
  }
  getCertainBook(id: string): Observable<any> {
    return this.httpClient.get(this.url + "/" + id).pipe(map(response => response))
  }
}
