import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/book';
import { BooksService } from 'src/app/shared/books.service';
import { Router } from '@angular/router';
import { GenresService } from 'src/app/shared/genres.service';
import { Genre } from 'src/app/shared/genre';
import { AuthorsService } from 'src/app/shared/authors.service';
import { Author } from 'src/app/shared/author';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];
  empty: boolean = true;
  isLoaded: boolean = false;
  headElements = ['name', 'pages', 'genre'];
  genresIsEmpty: boolean = false;
  authorsIsEmpty: boolean = false;
  message: string;
  filteredBooks: Book[]

  constructor(private booksService: BooksService, private router: Router, private genresService: GenresService, private authorsService: AuthorsService) { }

  ngOnInit() {
    this.booksService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.assignCopy();
      this.isLoaded = true;
      console.log(this.books)
      if (data.length != 0) {
        this.empty = false
      };
    })
    this.genresService.getGenres().subscribe((genres: Genre[]) => {
      if (genres.length == 0) {
        this.genresIsEmpty = true;
      }
    });
    this.authorsService.getAuthors().subscribe((authors: Author[]) => {
      if (authors.length == 0) {
        this.authorsIsEmpty = true;
      }
    });
  }
  
assignCopy(){
  this.filteredBooks = this.books;
}
filterItem(value){
  if(!value){
      this.assignCopy();
  } 
  this.filteredBooks = Object.assign([], this.books).filter(
     item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
  )
}

  bookDetails(book: Book) {
    this.router.navigate(['system/books/details', book.id])
  }
  bookEdit(book: Book) {
    this.router.navigate(['system/books/edit', book.id])
  }
  bookCreate() {
    if (this.genresIsEmpty) {
      this.message = "The list of genres is empty. Please, add genres before book creation";
      setTimeout(() => {
        this.router.navigate(['system/genres/create'])
      }, 3000)
    }
    else if (this.authorsIsEmpty) {
      this.message = "The list of authors is empty. Please, add author before book creation";
      setTimeout(() => {
        this.router.navigate(['system/authors/create'])
      }, 3000)
    }
    else {
      this.router.navigate(['system/books/create'])
    }
  }
  bookDelete(book: Book) {
    this.router.navigate(['system/books/delete', book.id])
  }
}
