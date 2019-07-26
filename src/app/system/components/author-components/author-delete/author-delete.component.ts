import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/shared/author';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorsService } from 'src/app/shared/authors.service';
import { Book } from 'src/app/shared/book';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-author-delete',
  templateUrl: './author-delete.component.html',
  styleUrls: ['./author-delete.component.css']
})
export class AuthorDeleteComponent implements OnInit {


  currentAuthor: Author;
  allBooks: Book[]
  message: string;
  isLoaded: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authorsService: AuthorsService, private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getBooks().subscribe((data: Book[]) => this.allBooks = data);
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.authorsService.getAuthors().subscribe((authors: Author[]) => {
        this.currentAuthor = authors.find(item => item.id == id)
        this.isLoaded = true;

      },
        error => this.message = error);
    }
  }
  deleteAuthor() {

    this.deleteBooksOfAuthor();

    const id = this.activatedRoute.snapshot.params['id'];
    this.authorsService.deleteAuthor(id).subscribe(() => {
      this.message = `The ${this.currentAuthor.name} was successfully deleted`;
      setTimeout(() => {
        this.returnToList()
      }, 1500);
    },
      error => this.message = error);
  }
  returnToList() {
    this.router.navigate(["/system/authors"])
  }

  deleteBooksOfAuthor() {
    for (let bookOfAuthor of this.currentAuthor.books) {
      for (let book of this.allBooks) {
        if (book.name == bookOfAuthor) {
          this.booksService.deleteBook(book.id).subscribe()
        }
      }
    }
  }
}
