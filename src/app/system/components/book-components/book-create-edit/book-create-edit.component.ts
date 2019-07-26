import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/book';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BooksService } from 'src/app/shared/books.service';
import { AuthorsService } from 'src/app/shared/authors.service';
import { Author } from 'src/app/shared/author';
import { GenresService } from 'src/app/shared/genres.service';
import { Genre } from 'src/app/shared/genre';

@Component({
  selector: 'app-book-create-edit',
  templateUrl: './book-create-edit.component.html',
  styleUrls: ['./book-create-edit.component.css']
})
export class BookCreateEditComponent implements OnInit {

  currentBook: Book;
  currentAuthorOfBook: Author;
  message: string;
  bookForm: FormGroup;
  isLoaded: boolean = false;
  authors: Author[];
  genres: Genre[];

  constructor(private booksService: BooksService, private authorsService: AuthorsService, private genresService: GenresService, private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.authorsService.getAuthors().subscribe(data => this.authors = data);
    this.genresService.getGenres().subscribe(data => this.genres = data);

    this.buildForm();
    this.getBookFromRoute();
  }

  buildForm() {
    this.bookForm = new FormGroup({
      author: new FormControl(null, Validators.required),
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
  getBookFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];

      if (id) {
        this.booksService.getCertainBook(id).subscribe(
          (book: Book) => {
            this.currentBook = book;
            this.bookForm.patchValue(this.currentBook);
            this.isLoaded = true;
          },
          (error) => this.message = error
        );
      }
      else {
        this.currentBook = new Book(null, null, null, null, null);
        this.bookForm.patchValue(this.currentBook);
        this.isLoaded = true;
      }
    })
  }

  onSubmit(bookForm: FormGroup) {
    this.currentBook.author = bookForm.value.author;
    this.currentBook.name = bookForm.value.name;
    this.currentBook.name = this.currentBook.name[0].toUpperCase() + this.currentBook.name.slice(1);
    this.currentBook.pages = bookForm.value.pages;
    this.currentBook.genre = bookForm.value.genre;

    if (this.currentBook.id) {

      this.deletePrevAuthorBook();
      this.pushTheBookToAuthor();

      this.booksService.editBook(this.currentBook).subscribe(
        () => {
          this.message = "The Book was successfully updated";
          setTimeout(() => {
            this.returnToList()
          }, 1500)
        },
        (error) => this.message = error
      );
    }
    else {

      this.pushTheBookToAuthor();
      console.log(this.currentBook.author)
      this.booksService.addBook(this.currentBook).subscribe(
        () => {
          this.message = "The Book was successfully added"
          setTimeout(() => {
            this.returnToList()
          }, 1500)
        },
        error => this.message = error
      );
    }
  }

  returnToList() {
    this.router.navigate(["system/books"]);
  }

  pushTheBookToAuthor() {
    this.currentAuthorOfBook = this.authors.find(author => author.name + " " + author.surname == this.currentBook.author);
    console.log(this.currentAuthorOfBook);
    this.currentAuthorOfBook.books.push(this.currentBook.name);
    this.authorsService.editAuthor(this.currentAuthorOfBook).subscribe();
  }
  deletePrevAuthorBook() {
    let prevAuthorOfBook: Author = this.authors.find(author => author.books.includes(this.currentBook.name));
    prevAuthorOfBook.books.splice(prevAuthorOfBook.books.indexOf(this.currentBook.name), 1);
    this.authorsService.editAuthor(prevAuthorOfBook).subscribe();
  }
}
