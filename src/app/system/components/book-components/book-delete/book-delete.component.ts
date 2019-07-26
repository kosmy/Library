import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/book';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/shared/books.service';
import { Author } from 'src/app/shared/author';
import { AuthorsService } from 'src/app/shared/authors.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {

  currentBook: Book;
  authors: Author[]
  message: string;
  isLoaded: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private booksService: BooksService, private authorsService: AuthorsService) { }

  ngOnInit() {
    this.authorsService.getAuthors().subscribe(data => this.authors = data);
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.booksService.getBooks().subscribe((books: Book[]) => {
        this.currentBook = books.find(item => item.id == id)
        this.isLoaded = true;
      },
      error => this.message = error);
    }
  }
  deleteBook() {
    this.deteleAuthorBook();
    
    const id = this.activatedRoute.snapshot.params['id'];
    
    this.booksService.deleteBook(id).subscribe(() => {
      this.message = `The ${this.currentBook.name} was successfully deleted`;
      setTimeout(() => {
        this.returnToList()
      }, 1500);
    },
    error => this.message = error);
  }
  returnToList() {
    this.router.navigate(["/system/books"])
  }

  deteleAuthorBook() {
    let authorOfBook: Author = this.authors.find(author => author.books.includes(this.currentBook.name));
    authorOfBook.books.splice(authorOfBook.books.indexOf(this.currentBook.name),1);
    this.authorsService.editAuthor(authorOfBook).subscribe();
  }

}
