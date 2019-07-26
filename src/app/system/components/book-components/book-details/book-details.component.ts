import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/book';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/shared/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  currentBook: Book;
  isLoaded: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private booksService: BooksService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];

    this.booksService.getBooks().subscribe((data: Book[]) => {
      this.currentBook = data.find(item => item.id == id);
      this.isLoaded = true
    })
  }
  returnToBooks() {
    this.router.navigate(["system/books"]);
  }

}
