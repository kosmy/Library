import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/shared/author';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksService } from 'src/app/shared/books.service';
import { AuthorsService } from 'src/app/shared/authors.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Book } from 'src/app/shared/book';
import { GenresService } from 'src/app/shared/genres.service';
import { Genre } from 'src/app/shared/genre';

@Component({
  selector: 'app-book-create-for-author',
  templateUrl: './book-create-for-author.component.html',
  styleUrls: ['./book-create-for-author.component.css']
})
export class BookCreateForAuthorComponent implements OnInit {

  currentAuthor: Author;
  currentBook: Book;
  message: string;
  bookForm: FormGroup;
  isLoaded: boolean = false;
  authors: Author[];
  genres: Genre[];

  constructor(private booksService: BooksService, private authorsService: AuthorsService, private genresService: GenresService, private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.genresService.getGenres().subscribe(data => this.genres = data);

    this.activatedRoute.params.forEach((params: Params) => {
      let id: string = params['id'];

      this.authorsService.getCertainAuthor(id).subscribe((author: Author) => {
        this.currentAuthor = author;
        this.isLoaded = true;
      })
    });

    this.buildForm();
    this.getNewBook();
  }

  buildForm() {
    this.bookForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Za-z ]*'),
        Validators.minLength(1),
        Validators.maxLength(100)
      ]),
      pages: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(10000)
      ]),
      genre: new FormControl(null, Validators.required)
    })
  }

  checkError(element: string, errorType: string) {
    return this.bookForm.get(element).hasError(errorType) &&
      this.bookForm.get(element).touched
  }
  getNewBook() {
    this.currentBook = new Book(null, null, null, null, null);
    this.bookForm.patchValue(this.currentBook);
  }

  onSubmit(bookForm: FormGroup) {
    this.currentBook.author = this.currentAuthor.name;
    this.currentBook.name = bookForm.value.name;
    this.currentBook.name = this.currentBook.name[0].toUpperCase() + this.currentBook.name.slice(1);
    this.currentBook.pages = bookForm.value.pages;
    this.currentBook.genre = bookForm.value.genre;

    this.pushTheBookToAuthor();
    this.booksService.addBook(this.currentBook).subscribe(
      () => {
        this.message = "The Book was successfully added"
        setTimeout(() => {
          this.returnToAuthors()
        }, 1500)
      },
      error => this.message = error
    );

  }

  returnToAuthors() {
    this.router.navigate(["system/authors"]);
  }

  pushTheBookToAuthor() {
    this.currentAuthor.books.push(this.currentBook.name);
    this.authorsService.editAuthor(this.currentAuthor).subscribe();
  }

}
